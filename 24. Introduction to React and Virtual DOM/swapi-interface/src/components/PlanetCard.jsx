// src/components/PlanetCard.js
import React from 'react';

const PlanetCard = ({ planet }) => (
    <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-info">{planet.name}</h5>
                <p className="card-text">
                    <strong>Climate:</strong> {planet.climate}<br/>
                    <strong>Terrain:</strong> {planet.terrain}<br/>
                    <strong>Population:</strong> {planet.population}
                </p>
                <button className="btn btn-info btn-sm">Explore Planet</button>
            </div>
        </div>
    </div>
);

export default PlanetCard;