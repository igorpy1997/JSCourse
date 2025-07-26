// src/components/FilmCard.js
import React from 'react';

const FilmCard = ({ film }) => (
    <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-danger">Episode {film.episode_id}: {film.title}</h5>
                <p className="card-text">
                    <strong>Director:</strong> {film.director}<br/>
                    <strong>Producer:</strong> {film.producer}<br/>
                    <strong>Release Date:</strong> {film.release_date}
                </p>
                <button className="btn btn-danger btn-sm">Watch Trailer</button>
            </div>
        </div>
    </div>
);

export default FilmCard;