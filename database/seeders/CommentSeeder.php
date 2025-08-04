<?php

namespace Database\Seeders;

use App\Models\Pattern;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create();
        $repliesUser = User::find(1);
        $pattern = Pattern::where(['published' => true, 'shared' => true])->first();
        $parrentComment = $pattern->comments()->create([
            'user_id' => $user->id,
            'comment' => 'Test comment'
        ]);

        $parrentComment->replies()->create([
            'user_id' => $repliesUser->id,
            'comment' => 'Test reply',
            'pattern_id' => $pattern->id,
        ]);
    }
}
