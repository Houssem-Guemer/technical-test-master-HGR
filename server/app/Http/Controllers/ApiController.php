<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Searchable\Search;
use Spatie\Searchable\ModelSearchAspect;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;

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

    public function searchData(Request $request)
    {
        $search = (new Search())
            ->registerModel(User::class, function(ModelSearchAspect $modelSearchAspect) {
                $modelSearchAspect
                ->addSearchableAttribute('first_name')
                ->addSearchableAttribute('last_name')
                ->addExactSearchableAttribute('email')
                ->with('posts', 'comments');
            })
            ->registerModel(Post::class, function(ModelSearchAspect $modelSearchAspect) {
                $modelSearchAspect
                ->addSearchableAttribute('body')
                ->addSearchableAttribute('title')
                ->with('user');
            })
            ->registerModel(Comment::class, function(ModelSearchAspect $modelSearchAspect) {
                $modelSearchAspect
                ->addSearchableAttribute('body')
                ->with('user');
            });

        $searchResults = $search->search($request->searchTerm);

        return response()->json($searchResults);
    }
}
