const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8080', 'http://127.0.0.1:8081', 'http://127.0.0.1:3001', "http://localhost:3001"],
    credentials: true
}));

// CRITICAL: JSON parser middleware (WAS MISSING!)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Debug middleware
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📦 Body:', req.body);
    }
    next();
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('📦 Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Todo Schema
const todoSchema = new mongoose.Schema({
    text: {
        type: String, required: true, trim: true, maxlength: 500
    }, completed: {
        type: Boolean, default: false
    }, createdAt: {
        type: Date, default: Date.now
    }, updatedAt: {
        type: Date, default: Date.now
    }
});

// Update updatedAt on save
todoSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Todo = mongoose.model('Todo', todoSchema);

// API Routes

// GET /api/todos - get all tasks
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({createdAt: -1});
        res.json({
            success: true, data: todos, count: todos.length
        });
    } catch (error) {
        console.error('Get todos error:', error);
        res.status(500).json({
            success: false, error: 'Server error', message: 'Failed to fetch todos'
        });
    }
});

// POST /api/todos - create new task
app.post('/api/todos', async (req, res) => {
    try {
        const {text} = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false, error: 'Validation error', message: 'Task text is required'
            });
        }

        if (text.trim().length > 500) {
            return res.status(400).json({
                success: false, error: 'Validation error', message: 'Task text is too long (max 500 characters)'
            });
        }

        const todo = new Todo({
            text: text.trim()
        });

        const savedTodo = await todo.save();

        res.status(201).json({
            success: true, data: savedTodo, message: 'Task created successfully'
        });
    } catch (error) {
        console.error('Create todo error:', error);
        res.status(500).json({
            success: false, error: 'Server error', message: 'Failed to create task'
        });
    }
});

// PUT /api/todos/:id - update task
app.put('/api/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {text, completed} = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false, error: 'Validation error', message: 'Invalid task ID'
            });
        }

        const updateData = {updatedAt: new Date()};

        if (text !== undefined) {
            if (text.trim().length === 0) {
                return res.status(400).json({
                    success: false, error: 'Validation error', message: 'Task text cannot be empty'
                });
            }
            updateData.text = text.trim();
        }

        if (completed !== undefined) {
            updateData.completed = Boolean(completed);
        }

        const todo = await Todo.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});

        if (!todo) {
            return res.status(404).json({
                success: false, error: 'Not found', message: 'Task not found'
            });
        }

        res.json({
            success: true, data: todo, message: 'Task updated successfully'
        });
    } catch (error) {
        console.error('Update todo error:', error);
        res.status(500).json({
            success: false, error: 'Server error', message: 'Failed to update task'
        });
    }
});

// DELETE /api/todos/:id - delete task
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false, error: 'Validation error', message: 'Invalid task ID'
            });
        }

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                success: false, error: 'Not found', message: 'Task not found'
            });
        }

        res.json({
            success: true, data: todo, message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Delete todo error:', error);
        res.status(500).json({
            success: false, error: 'Server error', message: 'Failed to delete task'
        });
    }
});

// DELETE /api/todos - delete all completed tasks
app.delete('/api/todos', async (req, res) => {
    try {
        const result = await Todo.deleteMany({completed: true});

        res.json({
            success: true,
            data: {deletedCount: result.deletedCount},
            message: `Deleted ${result.deletedCount} completed task(s)`
        });
    } catch (error) {
        console.error('Clear completed error:', error);
        res.status(500).json({
            success: false, error: 'Server error', message: 'Failed to clear completed tasks'
        });
    }
});

// GET /api/stats - task statistics
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Todo.countDocuments();
        const completed = await Todo.countDocuments({completed: true});
        const active = total - completed;

        res.json({
            success: true, data: {
                total, completed, active, completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false, error: 'Server error', message: 'Failed to get statistics'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false, error: 'Not found', message: 'API endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({
        success: false, error: 'Internal server error', message: 'Something went wrong!'
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received. Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received. Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api/todos`);
    console.log(`💓 Health: http://localhost:${PORT}/api/health`);
});

module.exports = {app, server};