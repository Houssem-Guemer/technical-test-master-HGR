<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use App\Models\Post;
use App\Models\Comment;

class User extends Model implements Searchable
{
    public $searchableType = 'user';

    public function getSearchResult(): SearchResult
     {
        $url = '/users/'.$this->id;
     
         return new SearchResult(
            $this,
            $this->first_name.' '.$this->last_name,
            $url
         );
     }

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
