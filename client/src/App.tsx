import React, { useEffect, useState} from 'react';
import PostComponent from './components/PostComponent';
import ApiService from "./services/ApiService";
import type PostData from './types/Post';

function App() {
  const [posts, setPosts] = useState<PostData[]>([]);

  const fetchData = () => {
    ApiService.getAllPosts()
      .then((response) => {
        return response.json() as unknown as PostData[]
      })
      .then((data) => {
        setPosts(data)
        console.log(data)
      }).catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  })

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Swikly</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Blog</a></li>
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
                    <div className="row">
                      {posts.map((post, index) => (
                            <PostComponent key={index} {...post}></PostComponent>
                        ))}
                    </div>
                    <nav aria-label="Pagination">
                        <hr className="my-0" />
                        <ul className="pagination justify-content-center my-4">
                            <li className="page-item disabled"><a className="page-link" href="#" aria-disabled="true">Newer</a></li>
                            <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                            <li className="page-item"><a className="page-link" href="#!">2</a></li>
                            <li className="page-item"><a className="page-link" href="#!">3</a></li>
                            <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                            <li className="page-item"><a className="page-link" href="#!">15</a></li>
                            <li className="page-item"><a className="page-link" href="#!">Older</a></li>
                        </ul>
                    </nav>
                </div>
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
            </div>
        </div>
        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Guemer Houssem 2022</p></div>
        </footer>
      </div>
    );
}

export default App;
