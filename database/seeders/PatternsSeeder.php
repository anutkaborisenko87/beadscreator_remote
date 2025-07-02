<?php

namespace Database\Seeders;

use App\Models\Pattern;
use App\Models\PatternCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PatternsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $patternCat = PatternCategory::whereHas('translate', function ($query) {
            $query->where('title', 'Новорічні прикраси');
        })->first();
        $patterns = [
            [
                'title' => 'Test 1',
                'description' => 'Test description 1',
                'published' => true,
                'shared' => true,
                'user_id' => $user->id,
                'preview_image' => Storage::url('previews/Screenshot_1.png'),
                'pattern_data' => file_get_contents(database_path('seeders/testData/testData1.json')),
                'category' => [$patternCat ? $patternCat->id : 1],
            ],
            [
                'title' => 'Test 2',
                'description' => 'Test description 2',
                'published' => true,
                'shared' => true,
                'user_id' => $user->id,
                'preview_image' => Storage::url('previews/Screenshot_2.png'),
                'pattern_data' => file_get_contents(database_path('seeders/testData/testData2.json')),
                'category' => [$patternCat ? $patternCat->id : 1],
            ],
            [
                'title' => 'Test 3',
                'description' => 'Test description 3',
                'published' => true,
                'shared' => true,
                'user_id' => $user->id,
                'preview_image' => Storage::url('previews/Screenshot_3.png'),
                'pattern_data' => file_get_contents(database_path('seeders/testData/testData3.json')),
                'category' => [$patternCat ? $patternCat->id : 1],
            ],
            [
                'user_id' => $user->id,
                'pattern_data' => file_get_contents(database_path('seeders/testData/testDraft1.json')),
            ],
            [
                'user_id' => $user->id,
                'pattern_data' => file_get_contents(database_path('seeders/testData/testDraft2.json')),
            ],
            [
                'user_id' => $user->id,
                'pattern_data' => file_get_contents(database_path('seeders/testData/testDraft3.json')),
            ]
        ];
        foreach ($patterns as $pattern) {
            $category = null;
            if (isset($pattern['category'])) {
                $category = $pattern['category'];
                unset($pattern['category']);
            }
            $pattern = Pattern::create($pattern);
            if (!is_null($category)) {
                $pattern->category()->attach($category);
            }
        }
    }
}
