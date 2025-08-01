import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CustomThemeProvider } from './context/ThemeContext';

// Import pages
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import SwapiPage from './pages/SwapiPage/SwapiPage';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';

function App() {
  return (
      <Provider store={store}>
        <CustomThemeProvider>
          <Router>
            <CssBaseline />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/swapi" element={<SwapiPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
              </Routes>
            </Layout>
          </Router>
        </CustomThemeProvider>
      </Provider>
  );
}

export default App;