import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Contacts from './pages/Contacts/Contacts';
import About from './pages/About/About';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
      <ThemeProvider>
        <ErrorBoundary>
          <Router>
            <div className="App">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
  );
}

export default App;