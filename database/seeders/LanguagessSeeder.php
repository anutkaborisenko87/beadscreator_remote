<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguagessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            [
                'name' => 'Укр',
                'title' => 'Українська',
                'slug' => 'uk',
                'locale' => 'uk-UA',
                'default' => 1,
                'status' => 1,
            ],
            [
                'name' => 'En',
                'title' => 'English',
                'slug' => 'en',
                'locale' => 'en-UK',
                'default' => 0,
                'status' => 1,
            ]
        ];
        foreach ($languages as $language) {
            Language::create($language);
        }
    }
}
