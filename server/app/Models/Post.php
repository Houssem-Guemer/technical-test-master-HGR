<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use App\Models\User;
use App\Models\Comment;

class Post extends Model implements Searchable
{
    public $searchableType = 'post';

    protected $with = [
        'user',
        'comments'
    ];

    public function getSearchResult(): SearchResult
     {
        $url = '/posts/'.$this->id;
     
         return new SearchResult(
            $this,
            $this->title,
            $url
         );
     }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
