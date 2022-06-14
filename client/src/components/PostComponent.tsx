import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from "react-router-dom";
import type PostData from '../types/Post';

function PostComponent(post: PostData) {
    return (
      <div className="col-6">
        <div className="card mb-4">
            <div className="card-body">
            <Link to={"/users/"+String(post.user.id)} className="text-dark text-decoration-none hover-primary text-bold"> <div className="text-muted">{post.user.last_name} {post.user.first_name} | {post.user.email}</div></Link>
                <Link to={"/posts/"+post.id} className="text-dark text-decoration-none hover-primary text-bold"><h2 className="card-title h4">{post.title}</h2></Link>
                <p className="card-text">{post.body}</p>
                <div className="small text-muted">Comments {post.comments.length}</div>
            </div>
        </div>
      </div>
    );
}

export default PostComponent;
