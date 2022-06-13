<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comments = collect(
            json_decode(file_get_contents(base_path('dummyJson/comments.json')))
        );

        DB::table('comments')->insert(
            $comments->map(
                function($comment) {
                    return [
                        'id' => $comment->id,
                        'user_id' => $comment->user->id,
                        'post_id' => $comment->postId,
                        'body' => $comment->body,
                    ];
                }
            )->toArray()
        );
    }
}
