import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import ApiService from '../services/ApiService';
import type PageData from '../types/Page';
import type PostData from '../types/Post';
import PostComponent from './PostComponent';

function PostsComponent() {
    const initPageData = {
      current_page: 1,
      per_page: 20,
      total: 100,
      data: [],
    }
    const [posts, setPosts] = useState<PostData[]>([]);
    const [pageData, setPageData] = useState<PageData>(initPageData);

    const toggleLoader = () => {
      if(document.getElementById("loader")?.classList.contains("d-none")) {
        document.getElementById("loader")?.classList.remove("d-none")
        document.getElementById("page")?.classList.add("d-none")
      } else {
        document.getElementById("loader")?.classList.add("d-none")
        document.getElementById("page")?.classList.remove("d-none")
      }
    }

    const fetchData = (pageNumber = 1) => {
      if (posts.length > 0) { 
        return; 
      }

      ApiService.getAllPosts(pageNumber)
        .then((response) => {
          return response.json() as unknown as PageData
        })
        .then((data) => {
          setPageData(data)
          setPosts(data.data)
          toggleLoader()
          console.log(data)
        }).catch((error: any) => {
          toggleLoader()
          console.log(error)
        })
    }

    const changePage = (pageNumber: number) => {
      toggleLoader()
      ApiService.getAllPosts(pageNumber)
        .then((response) => {
          return response.json() as unknown as PageData
        })
        .then((data) => {
          setPageData(data)
          setPosts(data.data)
          toggleLoader()
          console.log(data)
        }).catch((error: any) => {
          toggleLoader()
          console.log(error)
        })
    }
  
    useEffect(() => {
      fetchData()
    })
    
    return (
        <div>
            <div className="row" id="loader">
              <div className="col-12 d-flex justify-content-center">
                <div className="spinner-border mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div className="d-none" id="page">
              <div className="row">
                {posts.map((post, index) => (
                          <PostComponent key={index} {...post}></PostComponent>
                  ))}
              </div>
              <div className="justify-content-center d-flex mb-3">
                <Pagination
                    activePage={pageData.current_page}
                    itemsCountPerPage={pageData.per_page}
                    totalItemsCount={pageData.total}
                    onChange={(pageNumber: number) => {
                        changePage(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
              </div>
            </div>
        </div>
    );
}

export default PostsComponent;
