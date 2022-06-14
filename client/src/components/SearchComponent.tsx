import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

function SearchComponent() {
    return (
    <div className="col-lg-4">
        <div className="card mb-4">
            <div className="card-header">Search</div>
            <div className="card-body">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                    <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SearchComponent;
