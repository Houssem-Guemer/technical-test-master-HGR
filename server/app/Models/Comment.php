<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use App\Models\User;
use App\Models\Post;

class Comment extends Model implements Searchable
{
    public $searchableType = 'comment';

    protected $with = [
        'user'
    ];

    public function getSearchResult(): SearchResult
     {
        $url = '/posts/'.$this->post->id;
     
         return new SearchResult(
            $this,
            $this->body,
            $url
         );
     }

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
