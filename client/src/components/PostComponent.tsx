import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import type PostData from '../types/Post';

function PostComponent(post: PostData) {
    return (
      <div className="col-6">
        <div className="card mb-4">
            <div className="card-body">
                <div className="small text-muted">{post.user.last_name} {post.user.first_name}</div>
                <h2 className="card-title h4">{post.title}</h2>
                <p className="card-text">{post.body}</p>
            </div>
        </div>
      </div>
    );
}

export default PostComponent;
