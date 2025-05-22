<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enLangId = Language::where('slug', 'en')->first()->id;
        $uaLangId = Language::where('slug', 'uk')->first()->id;
        $pages = [
            [
                'slug' => '',
                'home' => true,
                'status' => true,
                'publish_up' => now(),
                'deletable' => false,
                'translate' => [
                    $enLangId => ['title' => 'Home', 'intro' => 'Home intro',  'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Домашня сторінка', 'intro' => 'Інтро для домашньої сторінки', 'language_id' => $uaLangId]
                ]
            ],
            [
                'slug' => 'gallery',
                'home' => false,
                'status' => true,
                'publish_up' => now(),
                'deletable' => false,
                'translate' => [
                    $enLangId => ['title' => 'Gallery', 'intro' => 'Gallery intro',  'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Галерея', 'intro' => 'Інтро для сторінки галереї', 'language_id' => $uaLangId]
                ]
            ],
            [
                'slug' => 'aboutus',
                'home' => false,
                'status' => true,
                'publish_up' => now(),
                'deletable' => false,
                'translate' => [
                    $enLangId => ['title' => 'About us', 'intro' => 'About us intro',  'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Про нас', 'intro' => 'Інтро для сторінки про нас', 'language_id' => $uaLangId]
                ]
            ],
            [
                'slug' => 'editor',
                'home' => false,
                'status' => true,
                'publish_up' => now(),
                'deletable' => false,
                'translate' => [
                    $enLangId => ['title' => 'Editor', 'intro' => 'Editor intro',  'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Редактор', 'intro' => 'Інтро для сторінки редактора', 'language_id' => $uaLangId]
                ]
            ],
        ];


        foreach ($pages as $page) {
            $newPage = Page::create([
                'slug' => $page['slug'],
                'home' => $page['home'],
                'status' => $page['status'],
                'publish_up' => $page['publish_up'],
                'deletable' => $page['deletable'],
            ]);
            foreach ($page['translate'] as $langId => $translate) {
                $newPage->translate($langId)->create($translate);
            }

        }
    }
}
