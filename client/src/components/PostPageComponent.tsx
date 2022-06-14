import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import type PostData from '../types/Post';
import CommentComponent from './CommentComponent';

function PostPageComponent() {
    const { id } = useParams();
    const initUser = {
        id: "string",
        first_name: "string",
        last_name: "string",
        user_name: "string",
        email: "string",
        age: "string",
        image_url: "string",
        created_at: "string",
        updated_at: "string",
        comments: [],
        posts: [],
      }
    const initPost = {
        id: "string",
        user_id: "string",
        title: "string",
        body: "string",
        created_at: "string",
        updated_at: "string",
        user: initUser,
        comments: [],
      }
    const [post, setPost] = useState<PostData>(initPost);

    const fetchData = () => {
      if (post.id != "string") { 
        return; 
      }

      ApiService.getPost(id!)
        .then((response) => {
          return response.json() as unknown as PostData
        })
        .then((data) => {
          setPost(data)
          document.getElementById("loader")?.classList.add("d-none")
          document.getElementById("article")?.classList.remove("d-none")
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
            <div className="col-12 d-flex justify-content-center">
                <div id="loader" className="spinner-border mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className="d-none" id="article">
                <article className="blog-post">
                    <h2 className="blog-post-title">{post.title}</h2>
                    <div className="row">
                      <div className="col-1">
                        <img className='img img-responsive' src={post.user.image_url}></img>
                      </div>
                      <div className="col-11 text-left">
                        <Link to={"/users/"+String(post.user.id)} className="text-dark text-decoration-none hover-primary text-bold"> <div className="text-muted">{post.user.last_name} {post.user.first_name} | {post.user.email}</div></Link>
                      </div>
                    </div>
                    <p>{post.body}</p>
                </article>
                <hr/>
                { post.comments.length > 0 &&
                  <div>
                      <h3 className="mb-3 ">Comments</h3>
                      {post.comments.map((comment, index) => (
                              <CommentComponent key={index} {...comment}></CommentComponent>
                      ))}
                  </div>
                }
            </div>
        </div> 
    );
}

export default PostPageComponent;
