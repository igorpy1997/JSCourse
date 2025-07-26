// src/components/StarshipCard.js
import React from 'react';

const StarshipCard = ({ starship }) => (
    <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-success">{starship.name}</h5>
                <p className="card-text">
                    <strong>Model:</strong> {starship.model}<br/>
                    <strong>Manufacturer:</strong> {starship.manufacturer}<br/>
                    <strong>Crew:</strong> {starship.crew}
                </p>
                <button className="btn btn-success btn-sm">View Ship</button>
            </div>
        </div>
    </div>
);

export default StarshipCard;