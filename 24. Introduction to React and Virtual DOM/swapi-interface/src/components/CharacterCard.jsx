// src/components/CharacterCard.js
import React from 'react';

const CharacterCard = ({ character }) => (
    <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-warning">{character.name}</h5>
                <p className="card-text">
                    <strong>Height:</strong> {character.height} cm<br/>
                    <strong>Mass:</strong> {character.mass} kg<br/>
                    <strong>Birth Year:</strong> {character.birth_year}<br/>
                    <strong>Gender:</strong> {character.gender}
                </p>
                <button className="btn btn-primary btn-sm">View Details</button>
            </div>
        </div>
    </div>
);

export default CharacterCard;