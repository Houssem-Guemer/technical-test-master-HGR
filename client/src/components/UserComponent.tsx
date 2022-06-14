import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from "react-router-dom";
import type UserData from '../types/User';

function UserComponent(user: UserData) {
    return (
      <div className="col-4">
        <div className="card mb-4">
            <div className="card-body">
                <Link to={"/users/"+String(user.id)} className="text-dark text-decoration-none hover-primary text-bold"> <div className="">{user.last_name} {user.first_name} | {user.email}</div></Link>
                <div className="row">
                    <div className="col-4">
                        <img className='img img-responsive' src={user.image_url}></img>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                Posts count : {user.posts.length}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                Comments count : {user.comments.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}

export default UserComponent;
