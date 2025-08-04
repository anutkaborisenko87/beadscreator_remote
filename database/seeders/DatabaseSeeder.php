<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LanguagessSeeder::class,
            RolesSeeder::class,
            UserSeeder::class,
            PagesSeeder::class,
            LayoutSeeder::class,
            PageSectionSeeder::class,
            PatternCategorySeeder::class,
            PatternsSeeder::class,
            CommentSeeder::class,
            LikeSeeder::class,
        ]);
    }
}
