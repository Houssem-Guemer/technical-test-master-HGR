import 'bootstrap/dist/css/bootstrap.css';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchComponent() {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        navigate('/search?searchTerm=' + String(inputRef.current!["value"]));
    }
    return (
    <div className="col-lg-4">
        <div className="card mb-4">
            <div className="card-header">Search</div>
            <div className="card-body">
                <form method="GET" action="/search" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input ref={inputRef} className="form-control" name="searchTerm" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                        <button className="btn btn-primary" id="button-search" type="submit">Go!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default SearchComponent;
