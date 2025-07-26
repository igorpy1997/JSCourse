// src/components/SearchSection.js
import React from 'react';

const SearchSection = () => (
    <div className="container mt-4">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="input-group mb-4">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search the galaxy far, far away..."
                    />
                    <button className="btn btn-warning btn-lg" type="button">
                        🔍 Search
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default SearchSection;