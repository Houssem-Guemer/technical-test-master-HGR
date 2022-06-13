<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class ApiController extends Controller
{
    public function getPosts()
    {
        $posts = Post::all();
        return response()->json($posts);
    }
}
