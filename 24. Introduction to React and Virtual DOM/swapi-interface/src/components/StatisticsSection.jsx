// src/components/StatisticsSection.js
import React from 'react';

const StatisticsSection = () => (
    <div className="row mt-5 mb-4">
        <div className="col-md-3">
            <div className="card bg-warning text-dark text-center">
                <div className="card-body">
                    <h2 className="card-title">87</h2>
                    <p className="card-text">Characters</p>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card bg-info text-dark text-center">
                <div className="card-body">
                    <h2 className="card-title">60</h2>
                    <p className="card-text">Planets</p>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card bg-success text-white text-center">
                <div className="card-body">
                    <h2 className="card-title">37</h2>
                    <p className="card-text">Starships</p>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card bg-danger text-white text-center">
                <div className="card-body">
                    <h2 className="card-title">6</h2>
                    <p className="card-text">Films</p>
                </div>
            </div>
        </div>
    </div>
);

export default StatisticsSection;