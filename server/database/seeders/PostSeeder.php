<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts = collect(
            json_decode(file_get_contents(base_path('dummyJson/posts.json')))
        );

        DB::table('posts')->insert(
            $posts->map(
                function($post) {
                    return [
                        'id' => $post->id,
                        'user_id' => $post->userId,
                        'title' => $post->title,
                        'body' => $post->body,
                    ];
                }
            )->toArray()
        );
    }
}
