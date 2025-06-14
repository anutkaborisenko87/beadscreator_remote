<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\PageSectionLang;
use Illuminate\Database\Seeder;

class PageSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $homePageId = Page::where('home', true)->first()->id;
        $galeryPageId = Page::where('slug', 'gallery')->first()->id;
        $aboutUsPageId = Page::where('slug', 'aboutus')->first()->id;
        $editorPageId = Page::where('slug', 'editor')->first()->id;
        $enId = Language::where('slug', 'en')->first()->id;
        $uaId = Language::where('slug', 'uk')->first()->id;
        $pageSections = [
            [
                'slug' => 'home_page_section',
                'page_id' => $homePageId,
                'validation_rules' => [
                        'presentation_section' => 'text',
                        'action_motivate_section' => 'string',
                        'about_us_section' => [
                            'title' => 'string',
                            'intro' => 'text',
                        ],
                        'promo_section' => [
                            'title' => 'string',
                            'intro' => 'text_editor'
                        ]
                ],
                'translate' => [
                    $enId => [
                        'translation' => [
                            'presentation_section' => 'Our site helps you turn your ideas into unique beaded masterpieces. Thanks to the convenient online editor, you can easily create your own patterns, experiment with colors and shapes, and share your works with other craftsmen. Start creating today!',
                            'action_motivate_section' => 'Create your first diagram! Join a community of creative people and share your ideas.',
                            'about_us_section' => [
                                'title' => 'About us',
                                'intro' => 'We are a team of enthusiasts passionate about the art of beading. Our mission is to inspire and support creativity by providing convenient tools for creating and sharing beadwork patterns. Join our community and discover new horizons in the world of handmade crafts!',
                            ],
                            'promo_section' => [
                                'title' => 'Our online editor allows you to:',
                                'intro' => "<ul><li>Intuitively create bead patterns</li><li>Choose from a wide range of colors</li></ul><ul><li>Save and export your work</li><li>Get advice and inspiration from the community</li></ul>"
                            ]
                        ],
                    ],
                    $uaId => [
                        'translation' => [
                            'presentation_section' => 'Наш сайт допомагає перетворити ваші ідеї на унікальні бісерні шедеври. Завдяки зручному онлайн-редактору, ви можете легко створювати власні схеми, експериментувати з кольорами та формами, а також ділитися своїми роботами з іншими майстрами. Почніть творити вже сьогодні!',
                            'action_motivate_section' => 'Створіть свою першу схему! Приєднуйтесь до спільноти творчих людей і діліться своїми ідеями.',
                            'about_us_section' => [
                                'title' => 'Про нас',
                                'intro' => 'Ми — команда ентузіастів, що захоплюється мистецтвом бісеру. Наша місія — надихати та підтримувати творчість, надаючи зручні інструменти для створення та обміну бісерними схемами. Приєднуйтесь до нашої спільноти та відкрийте нові горизонти у світі ручної роботи!',
                            ],
                            'promo_section' => [
                                'title' => 'Наш онлайн-редактор дозволяє:',
                                'intro' => "<ul><li>Інтуїтивно створювати бісерні схеми</li><li>Вибирати з широкої палітри кольорів</li></ul><ul><li>Зберігати та експортувати ваші роботи</li><li>Отримувати поради та натхнення від спільноти</li></ul>"
                            ],
                        ]
                    ],
                ]
            ],
            [
                'slug' => 'gallery_page_section',
                'page_id' => $galeryPageId,
                'validation_rules' => [
                    'category_select' => [
                        'category_select_placeholder' => 'string',
                        'category_select_items' => 'function',
                    ],
                    'sort_select' => [
                        'sort_select_placeholder' => 'string',
                        'sort_select_items' => 'function',
                    ],
                    'search_input' => [
                        'search_input_placeholder' => 'string',
                    ],
                    'gallery_items' => 'function'
                ],
                'translate' => [
                    $enId => [
                        'translation' => [
                            'category_select' => [
                                'category_select_placeholder' => 'Choose a category',
                                'category_select_items' => 'getPatternCategoryList',
                            ],
                            'sort_select' => [
                                'sort_select_placeholder' => 'Sort by',
                                'sort_select_items' => 'getSortByList',
                            ],
                            'search_input' => [
                                'search_input_placeholder' => 'Search',
                            ],
                            'gallery_items' => 'getMainGalleryItemsList'
                        ]
                    ],
                    $uaId => [
                        'translation' => [
                            'category_select' => [
                                'category_select_placeholder' => 'Оберіть категорію',
                                'category_select_items' => 'getPatternCategoryList',
                            ],
                            'sort_select' => [
                                'sort_select_placeholder' => 'Сортувати за',
                                'sort_select_items' => 'getSortByList',
                            ],
                            'search_input' => [
                                'search_input_placeholder' => 'Шукати',
                            ],
                            'gallery_items' => 'getMainGalleryItemsList',
                        ]
                    ],

                ],
            ],
            [
                'page_id' => $aboutUsPageId,
                'slug' => 'aboutus_page_section',
                'validation_rules' => [
                    'title' => 'string',
                    'main_text' => 'text_editor',
                    'rated_pictures' => 'function'
                ],
                'translate' => [
                    $enId => [
                        'translation' => [
                            'title' => 'About us',
                            'main_text' => "<p>
                                                        We are a team of creative enthusiasts who live and breathe the art of beading. Our story began with a small workshop, where every piece of colored glass and sparkling beads opened up new possibilities for self-expression. Over the years, we have turned our passion into a real mission—to help others unleash their creative potential through the creation of unique beadwork patterns.
                                                    </p>
                                                    <p>
                                                        We believe that everyone can create something beautiful with their own hands. That is why we have developed a convenient online editor that allows you to easily and intuitively create your own schemes, experiment with colors and shapes, and exchange ideas with other craftsmen. Our platform is a place where every idea finds its reflection, and inspiration turns into real art.
                                                    </p>
                                                    <p>
                                                       Join our community, where creativity has no limits, and everyone can find support and new knowledge. Together we create not just beadwork patterns, but a real story of beauty, the details of which tell about the love for art and the desire to make the world brighter! Thank you for being with us. Your ideas inspire us to new achievements!
                                                    </p>
                                                    <p>
                                                        Thank you for being with us. Your ideas inspire us to new achievements!
                                                    </p>",
                            'rated_pictures' => 'getMainRatedPicturesList'
                        ]
                    ],
                    $uaId => [
                        'translation' => [
                            'title' => 'Про нас',
                            'main_text' => "<p>
                                                        Ми — команда творчих ентузіастів, що живе і дихає мистецтвом бісеру. Наша історія почалася з маленької
                                                        майстерні, де кожен шматочок кольорового скла та блискучих намистин відкривав нові можливості для
                                                        самовираження. З роками ми перетворили свою пристрасть у справжню місію — допомагати іншим розкривати
                                                        свій творчий потенціал через створення унікальних бісерних схем.
                                                    </p>
                                                    <p>
                                                        Ми віримо, що кожен може створити щось прекрасне своїми руками. Саме тому ми розробили зручний
                                                        онлайн-редактор, який дозволяє легко та інтуїтивно створювати власні схеми, експериментувати з кольорами
                                                        та формами, а також обмінюватися ідеями з іншими майстрами. Наша платформа — це місце, де кожна ідея
                                                        знаходить своє відображення, а натхнення перетворюється на справжнє мистецтво.
                                                    </p>
                                                    <p>
                                                        Приєднуйтесь до нашої спільноти, де творчість не має меж, і кожен може знайти підтримку та нові знання.
                                                        Разом ми створюємо не просто бісерні схеми, а справжню історію краси, деталі якої розповідають про любов
                                                        до мистецтва та бажання робити світ яскравішим!
                                                        Дякуємо, що ви з нами. Ваші ідеї надихають нас на нові звершення!
                                                    </p>
                                                    <p>
                                                        Дякуємо, що ви з нами. Ваші ідеї надихають нас на нові звершення!
                                                    </p>",
                            'rated_pictures' => 'getMainRatedPicturesList'
                        ]
                    ],

                ]
            ],
            [
                'page_id' => $editorPageId,
                'slug' => 'editor_page_section',
                'validation_rules' => [
                    'width_input_label' => 'string',
                    'width_input_title' => 'string',
                    'heigh_input_label' => 'string',
                    'heigh_input_title' => 'string',
                    'pencil_title' => 'string',
                    'fulfill_title' => 'string',
                    'eraser_title' => 'string',
                    'undo_title' => 'string',
                    'redo_title' => 'string',
                    'clear_title' => 'string',
                    'colors_title' => 'string',
                    'copyfield_title' => 'string',
                    'new_draft_title' => 'string',
                    'save_draft_title' => 'string'
                ],
                'translate' => [
                    $enId => [
                        'translation' => [
                            'width_input_label' => 'In width',
                            'width_input_title' => 'Number of beads',
                            'heigh_input_label' => 'In height',
                            'heigh_input_title' => 'Number of beads',
                            'pencil_title' => 'Draw',
                            'fulfill_title' => 'Filling',
                            'eraser_title' => 'Erase',
                            'undo_title' => 'Undo',
                            'redo_title' => 'Redo',
                            'clear_title' => 'Clear field',
                            'colors_title' => 'Palette',
                            'copyfield_title' => 'Select area to copy',
                            'new_draft_title' => 'Start a new draft',
                            'save_draft_title' => 'Save to my gallery'
                        ]
                    ],
                    $uaId => [
                        'translation' => [
                            'width_input_label' => 'В ширину',
                            'width_input_title' => 'Кількість бісерин',
                            'heigh_input_label' => 'В висоту',
                            'heigh_input_title' => 'Кількість бісерин',
                            'pencil_title' => 'Малювати',
                            'fulfill_title' => 'Заливка',
                            'eraser_title' => 'Стерти',
                            'undo_title' => 'Відминити',
                            'redo_title' => 'Повернути відмінене',
                            'clear_title' => 'Очистити поле',
                            'colors_title' => 'Палітра',
                            'copyfield_title' => 'Виділити область для копіювання',
                            'new_draft_title' => 'Почати нову чорнетку',
                            'save_draft_title' => 'Зберегти до совєї галереї'
                        ]
                    ],
                ]
            ]
        ];
        foreach ($pageSections as $pageSection) {
            $data = [];
            $data['page_id'] = $pageSection['page_id'];
            $data['slug'] = $pageSection['slug'];
            $data['validation_rules'] = json_encode($pageSection['validation_rules']);
            $createdSection = PageSection::create($data);
            foreach ($pageSection['translate'] as $langId => $translation) {
                $data = [];
                $data['page_section_id'] = $createdSection->id;
                $data['language_id'] = $langId;
                $data['translation'] = json_encode($translation['translation']);
                PageSectionLang::create($data);
            }
        }


    }
}
