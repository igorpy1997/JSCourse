# Weather Widget - Webpack Build

Modern weather widget with full Webpack optimization for production.

## 🚀 Quick Start

### 1. Install dependencies:
```bash
npm install
```

### 2. Setup API key:
```bash
# Create .env.example.example file with your OpenWeatherMap API key
echo "WEATHER_API_KEY=your_key_here" > .env.example.example
```

### 3. Start development:
```bash
npm start
```
Opens http://localhost:3000 with hot reload

### 4. Production build:
```bash
npm run build && npm run serve
```
Minified version at http://localhost:3000

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run serve` | HTTP server for `dist/` |
| `npm run watch` | Watch for file changes |

## 🔑 API Key

1. Get free key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create `.env` file:
```bash
WEATHER_API_KEY=your_actual_key
```

## 📁 Structure

```
├── src/
│   ├── index.html         # HTML template
│   ├── index.js           # Entry point
│   ├── js/
│   │   └── WeatherWidget.js   # Main widget class
│   └── styles/
│       └── main.scss      # SCSS styles
├── dist/                  # Build output (auto-generated)
├── webpack.config.js      # Webpack configuration
└── package.json          # Dependencies and scripts
```

## ⚡ What Webpack Does

- **JavaScript**: Babel transpilation + Terser minification
- **SCSS**: Compilation to CSS + minification
- **Images**: Automatic optimization
- **HTML**: Minification and inject styles/scripts
- **Cache**: Content hash for browser caching

## 🛠️ Troubleshooting

### "process is not defined" error:
```bash
rm -rf dist/ && npm run build
```

### .env file issues:
```bash
# Make sure file exists
ls -la .env.example.example
echo "WEATHER_API_KEY=test" > .env.example.example
```

### Dependencies problems:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Result

Production build creates:
- **JavaScript**: ~8KB minified
- **CSS**: ~4KB optimized
- **HTML**: Minified with hashes
- **Total**: ~12KB gzipped

Ready to deploy! 🚀