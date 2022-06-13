<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = collect(
            json_decode(file_get_contents(base_path('dummyJson/users.json')))
        );

        DB::table('users')->insert(
            $users->map(
                function($user) {
                    return [
                        'id' => $user->id,
                        'first_name' => $user->firstName,
                        'last_name' => $user->lastName,
                        'user_name' => $user->username,
                        'email' => $user->email,
                        'age' => $user->age,
                        'image_url' => $user->image,
                    ];
                }
            )->toArray()
        );
    }
}
