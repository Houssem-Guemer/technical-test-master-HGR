import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import PostPageComponent from './components/PostPageComponent';
import PostsComponent from './components/PostsComponent';
import SearchComponent from './components/SearchComponent';
import UserPageComponent from './components/UserPageComponent';

function App() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Swikly</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link to={"/"} className="nav-link active">
                            Blog
                          </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <header className="py-5 bg-light border-bottom mb-4">
            <div className="container">
                <div className="text-center my-5">
                    <h1 className="fw-bolder">Welcome to Houssem's test!</h1>
                    <p className="lead mb-0">A search engine test !</p>
                </div>
            </div>
        </header>
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <Routes>
                      <Route path="/" element={<PostsComponent/>} />
                      <Route path="/posts/:id" element={<PostPageComponent/>} />
                      <Route path="/users/:id" element={<UserPageComponent/>} />
                    </Routes>
                </div>
                <SearchComponent/>
            </div>
        </div>
        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Guemer Houssem 2022</p></div>
        </footer>
      </div>
    );
}

export default App;
