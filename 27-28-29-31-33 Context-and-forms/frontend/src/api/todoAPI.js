class TodoAPI {
    constructor() {
        this.baseURL = process.env.API_URL || 'http://localhost:3000/api';
        this.todosEndpoint = `${this.baseURL}/todos`;
        this.healthEndpoint = `${this.baseURL}/health`;
        this.statsEndpoint = `${this.baseURL}/stats`;
    }

    async request(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    async fetchTodos() {
        try {
            const response = await this.request(this.todosEndpoint);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw new Error('Failed to load tasks');
        }
    }

    async createTodo(text) {
        try {
            const response = await this.request(this.todosEndpoint, {
                method: 'POST',
                body: JSON.stringify({ text })
            });
            return response.data;
        } catch (error) {
            console.error('Error creating todo:', error);
            throw new Error('Failed to create task');
        }
    }

    async updateTodo(id, updates) {
        try {
            const response = await this.request(`${this.todosEndpoint}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updates)
            });
            return response.data;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw new Error('Failed to update task');
        }
    }

    async deleteTodo(id) {
        try {
            const response = await this.request(`${this.todosEndpoint}/${id}`, {
                method: 'DELETE'
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw new Error('Failed to delete task');
        }
    }

    async clearCompleted() {
        try {
            const response = await this.request(this.todosEndpoint, {
                method: 'DELETE'
            });
            return response.data;
        } catch (error) {
            console.error('Error clearing completed todos:', error);
            throw new Error('Failed to clear completed tasks');
        }
    }

    async getStats() {
        try {
            const response = await this.request(this.statsEndpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw new Error('Failed to get statistics');
        }
    }

    async healthCheck() {
        try {
            const response = await this.request(this.healthEndpoint);
            return response;
        } catch (error) {
            console.error('Health check failed:', error);
            throw new Error('Server unavailable');
        }
    }

    // Check server connection
    async checkConnection() {
        try {
            await this.healthCheck();
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default TodoAPI;