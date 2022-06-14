<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class ApiController extends Controller
{
    public function getPosts(Request $request)
    {
        $posts = Post::paginate(20);
        return response()->json($posts);
    }

    public function getPost($id)
    {
        $post = Post::where('id',$id)->get()->first();
        return response()->json($post);
    }

    public function getUser($id)
    {
        $user = User::with('posts', 'comments')->where('id',$id)->get()->first();
        return response()->json($user);
    }
}
