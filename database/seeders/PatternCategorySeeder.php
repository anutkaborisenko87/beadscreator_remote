<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\PatternCategory;
use App\Models\PatternCategoryLang;
use Illuminate\Database\Seeder;

class PatternCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enLangId = Language::where('slug', 'en')->first()->id;
        $uaLangId = Language::where('slug', 'uk')->first()->id;
        $categories = [
            [
                'translate' => [
                    $enLangId => ['title' => 'New Year\'s decorations', 'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Новорічні прикраси', 'language_id' => $uaLangId],
                ],
                'children' => [
                    [
                        'translate' => [
                            $enLangId => ['title' => 'Christmas balls', 'language_id' => $enLangId],
                            $uaLangId => ['title' => 'Новорічні кульки', 'language_id' => $uaLangId],
                        ],
                    ],
                    [
                        'translate' => [
                            $enLangId => ['title' => 'New Year\'s stars', 'language_id' => $enLangId],
                            $uaLangId => ['title' => 'Новорічні зірки', 'language_id' => $uaLangId],
                        ],
                    ]
                ]
            ],
            [
                'translate' => [
                    $enLangId => ['title' => 'Easter decor', 'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Пасхальний декор', 'language_id' => $uaLangId],
                ],
                'children' => [
                    [
                        'translate' => [
                            $enLangId => ['title' => 'Easter eggs', 'language_id' => $enLangId],
                            $uaLangId => ['title' => 'Пасхальні яйця', 'language_id' => $uaLangId],
                        ],
                    ]
                ]
            ],
            [
                'translate' => [
                    $enLangId => ['title' => 'Fashion jewelry', 'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Модні прикраси', 'language_id' => $uaLangId],
                ],
                'children' => [
                    [
                        'translate' => [
                            $enLangId => ['title' => 'Clutches', 'language_id' => $enLangId],
                            $uaLangId => ['title' => 'Клатчі', 'language_id' => $uaLangId],
                        ],
                    ],
                    [
                        'translate' => [
                            $enLangId => ['title' => 'Bracelets', 'language_id' => $enLangId],
                            $uaLangId => ['title' => 'Браслети', 'language_id' => $uaLangId],
                        ],
                    ],
                    [
                        'translate' => [
                            $enLangId => ['title' => 'Necklace', 'language_id' => $enLangId],
                            $uaLangId => ['title' => 'Кол\'є', 'language_id' => $uaLangId],
                        ],
                    ]
                ]
            ],
            [
                'translate' => [
                    $enLangId => ['title' => 'Other', 'language_id' => $enLangId],
                    $uaLangId => ['title' => 'Інше', 'language_id' => $uaLangId],
                ],
                'children' => []
            ],
        ];
        foreach ($categories as $category) {
           $createdCat = $this->createCategory($category);
            if (!empty($category['children'])) {
                foreach ($category['children'] as $child) {
                    $this->createCategory($child, $createdCat->id);
                }
            }
        }
    }

    private function createCategory($category, ?int $parent_id = null)
    {
        $createdCat = PatternCategory::create(['parent_id' => $parent_id]);
        foreach ($category['translate'] as $langId => $translate) {
            PatternCategoryLang::create([
                'pattern_category_id' => $createdCat->id,
                'language_id' => $langId,
                'title' => $translate['title'],
            ]);
        }
        return $createdCat;

    }
}
