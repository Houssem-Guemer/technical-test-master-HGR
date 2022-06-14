import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import type UserData from '../types/User';
import CommentComponent from './CommentComponent';
import PostComponent from './PostComponent';

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
      
    const [user, setUser] = useState<UserData>(initUser);

    const fetchData = () => {
      if (user.id != "string") { 
        return; 
      }

      ApiService.getUser(id!)
        .then((response) => {
          return response.json() as unknown as UserData
        })
        .then((data) => {
          setUser(data)
          document.getElementById("loader")?.classList.add("d-none")
          document.getElementById("page")?.classList.remove("d-none")
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
            <div className="d-none" id="page">
                <article className="blog-post">
                    <h2 className="blog-post-title">{user.first_name} {user.last_name} | {user.email}</h2>
                    <p>posts count : {user.posts.length} | comment count : {user.comments.length}</p>
                </article>
                
                { user.posts.length > 0 &&
                  <div>
                      <hr/>
                      <h3 className="mb-3 ">Posts</h3>
                      <div className="row">
                          {user.posts.map((post, index) => (
                              <PostComponent key={index} {...post}></PostComponent>
                          ))}
                      </div>
                  </div>
                }
                { user.comments.length > 0 &&
                  <div>
                      <hr/>
                      <h3 className="mb-3 ">Comments</h3>
                      {user.comments.map((comment, index) => (
                          <CommentComponent key={index} {...comment}></CommentComponent>
                      ))}
                  </div>
                }
            </div>
        </div> 
    );
}

export default PostPageComponent;