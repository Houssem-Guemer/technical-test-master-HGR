import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import CommentComponent from './CommentComponent';
import PostComponent from './PostComponent';
import UserComponent from './UserComponent';

function SearchPageComponent() {
    const [searchParams, _] = useSearchParams();
    const searchTerm = searchParams.get('searchTerm');
    
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const groupBy = (arr: any[], property: string) => {
        return arr.reduce(function(memo, x) {
          if (!memo[x[property]]) { memo[x[property]] = []; }
          memo[x[property]].push(x);
          return memo;
        }, {});
      }

    const toggleLoader = () => {
        if(document.getElementById("loader")?.classList.contains("d-none")) {
            document.getElementById("loader")?.classList.remove("d-none")
            document.getElementById("page")?.classList.add("d-none")
        } else {
            document.getElementById("loader")?.classList.add("d-none")
            document.getElementById("page")?.classList.remove("d-none")
        }
    }

    const fetchData = () => {
        toggleLoader();
        ApiService.searchSite(searchTerm!)
            .then((response) => {
                return response.json() as unknown as [];
            })
            .then((data) => {
                const groupedData = groupBy(data, 'type');
                setUsers(groupedData.user ? groupedData.user : []);
                setPosts(groupedData.post ? groupedData.post : []);
                setComments(groupedData.comment ? groupedData.comment : []);
                toggleLoader();
                console.log(groupedData);
            }).catch((error: any) => {
                toggleLoader();
                console.log(error);
            });
    }

    useEffect(() => {
      fetchData();
    }, [searchTerm]);
    
    return (
        <div>
            <div className="col-12 d-flex justify-content-center">
                <div id="loader" className="spinner-border mb-3 d-none" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className="" id="page">
                <article className="blog-post">
                    <h2 className="blog-post-title">Results for : {searchTerm}</h2>
                    <p>users count : {users.length} | posts count : {posts.length} | comment count : {comments.length}</p>
                </article>
                { users.length > 0 &&
                  <div>
                      <hr/>
                      <h3 className="mb-3 ">Users</h3>
                      <div className="row">
                          {users.map((user, index) => (
                              <UserComponent key={index} {...user['searchable']}></UserComponent>
                          ))}
                      </div>
                  </div>
                }
                { posts.length > 0 &&
                  <div>
                      <hr/>
                      <h3 className="mb-3 ">Posts</h3>
                      <div className="row">
                          {posts.map((post, index) => (
                              <PostComponent key={index} {...post['searchable']}></PostComponent>
                          ))}
                      </div>
                  </div>
                }
                { comments.length > 0 &&
                  <div>
                      <hr/>
                      <h3 className="mb-3 ">Comments</h3>
                      {comments.map((comment, index) => (
                          <CommentComponent key={index} {...comment['searchable']}></CommentComponent>
                      ))}
                  </div>
                }
            </div>
        </div> 
    );
}

export default SearchPageComponent;