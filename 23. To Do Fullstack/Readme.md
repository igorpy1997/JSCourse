# TODO Fullstack Application

Complete TODO app with Node.js backend and Webpack frontend.

## 🚀 Quick Start

### 1. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm start
```

**That's it!** Opens at http://localhost:8080

## ⚙️ Configuration

### Database Setup

**Option A: Local MongoDB**
```bash
sudo apt install mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Update `backend/.env`:
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.net/todoapp
```

### Environment Files

**backend/.env:**
```bash
MONGODB_URI=mongodb://localhost:27017/todoapp
```

**frontend/.env:**
```bash
API_URL=/api
```

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend API |
| `npm start` | Start frontend dev server |
| `npm run build` | Build for production |

## 🚨 Troubleshooting

**MongoDB not connecting?**
```bash
# Start MongoDB
sudo systemctl start mongodb

# Or use Atlas with proper connection string
```

**Port conflicts?**
```bash
# Kill processes
sudo lsof -i :3000
sudo lsof -i :8080
```

**Dependencies issues?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📁 Structure

```
├── backend/          # API Server (Port 3000)
│   ├── server.js     # Express + MongoDB
│   └── package.json
├── frontend/         # Client App (Port 8080)
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
```

## 🎯 Features

- ✅ Create/Read/Update/Delete tasks
- ✅ Filter tasks (all/active/completed)
- ✅ Real-time sync with MongoDB
- ✅ Responsive design
- ✅ Hot reload development

**Tech:** Node.js, Express, MongoDB, Webpack, Babel, SCSS, Bootstrap