<?php

namespace Database\Seeders;

use App\Models\Pattern;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create();
        $pattern = Pattern::where(['published' => true, 'shared' => true])->first();
        $pattern->likes()->create(['user_id' => $user->id]);
    }
}
