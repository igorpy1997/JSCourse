// src/components/Header.js
import React from 'react';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
            <a className="navbar-brand fw-bold fs-2" href="#">
                <span className="text-warning">STAR</span> <span className="text-info">WARS</span> API
            </a>
            <div className="navbar-nav ms-auto">
                <span className="navbar-text">May the Force be with you</span>
            </div>
        </div>
    </nav>
);

export default Header;