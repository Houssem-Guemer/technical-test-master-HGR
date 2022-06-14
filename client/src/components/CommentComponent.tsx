import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from "react-router-dom";
import type CommentData from '../types/Comment';

function CommentComponent(comment: CommentData) {
    return (
      <div className="col-12">
        <div className="card mb-3">
            <div className="card-body">
                <Link to={"/users/"+String(comment.user.id)} className="text-dark text-decoration-none hover-primary text-bold"> <div className="text-muted">{comment.user.last_name} {comment.user.first_name} | {comment.user.email}</div></Link>
                <p className="card-text">{comment.body}</p>
            </div>
        </div>
      </div>
    );
}

export default CommentComponent;
