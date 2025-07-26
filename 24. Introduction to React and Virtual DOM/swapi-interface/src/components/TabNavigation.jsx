// src/components/TabNavigation.js
import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => (
    <div className="container">
        <ul className="nav nav-pills nav-fill mb-4">
            <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === 'characters' ? 'active bg-warning text-dark' : 'text-warning'}`}
                    onClick={() => setActiveTab('characters')}
                >
                    👥 Characters
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === 'planets' ? 'active bg-info text-dark' : 'text-info'}`}
                    onClick={() => setActiveTab('planets')}
                >
                    🪐 Planets
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === 'starships' ? 'active bg-success text-dark' : 'text-success'}`}
                    onClick={() => setActiveTab('starships')}
                >
                    🚀 Starships
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === 'films' ? 'active bg-danger text-dark' : 'text-danger'}`}
                    onClick={() => setActiveTab('films')}
                >
                    🎬 Films
                </button>
            </li>
        </ul>
    </div>
);

export default TabNavigation;