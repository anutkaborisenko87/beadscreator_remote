<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Layouts;
use App\Models\LayoutsLang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enId = Language::where('slug', 'en')->first()->id;
        $uaId = Language::where('slug', 'uk')->first()->id;
        $layouts = [
            [
                'slug' => 'header_text',
                'translate' => [
                    $enId => ['title' => 'Welcome to the world of creativity with beads!'],
                    $uaId => ['title' => 'Ласкаво просимо у світ креативності з бісером!'],
                ]
            ],
            [
                'slug' => 'auth_profile_dropdown',
                'link' => '/profile',
                'translate' => [
                    $enId => ['title' => 'Profile'],
                    $uaId => ['title' => 'Профіль'],
                ]
            ],
            [
                'slug' => 'auth_logout_dropdown',
                'translate' => [
                    $enId => ['title' => 'Logout'],
                    $uaId => ['title' => 'Вийти'],
                ]
            ],
            [
                'slug' => 'auth_login_dropdown',
                'translate' => [
                    $enId => ['title' => 'Sign in'],
                    $uaId => ['title' => 'Увійти'],
                ]
            ],
            [
                'slug' => 'auth_register_dropdown',
                'translate' => [
                    $enId => ['title' => 'Sign up'],
                    $uaId => ['title' => 'Зареєструватися'],
                ]
            ],
            [
                'slug' => 'login_popup_title',
                'translate' => [
                    $enId => ['title' => 'Enter the site'],
                    $uaId => ['title' => 'Увійти на сайт'],
                ]
            ],
            [
                'slug' => 'login_popup_email_placeholder',
                'translate' => [
                    $enId => ['title' => 'Enter email'],
                    $uaId => ['title' => 'Введіть email'],
                ]
            ],
            [
                'slug' => 'login_popup_password_placeholder',
                'translate' => [
                    $enId => ['title' => 'Enter password'],
                    $uaId => ['title' => 'Введіть пароль'],
                ]
            ],
            [
                'slug' => 'login_popup_remember_label',
                'translate' => [
                    $enId => ['title' => 'Remember me'],
                    $uaId => ['title' => 'Запам\'ятати мене'],
                ]
            ],
            [
                'slug' => 'login_popup_sign_up_label',
                'translate' => [
                    $enId => ['title' => 'Sign up'],
                    $uaId => ['title' => 'Зареєструватися'],
                ]
            ],
            [
                'slug' => 'login_popup_sign_in_button',
                'translate' => [
                    $enId => ['title' => 'Sign in'],
                    $uaId => ['title' => 'Увійти'],
                ]
            ],
            [
                'slug' => 'login_popup_forgot_password_link',
                'link' => '/password/reset',
                'translate' => [
                    $enId => ['title' => 'Forgot your password?'],
                    $uaId => ['title' => 'Забуди паполь?'],
                ]
            ],
            [
                'slug' => 'login_popup_google_auth',
                'translate' => [
                    $enId => ['title' => 'Or log in using'],
                    $uaId => ['title' => 'Або увійти за допомогою'],
                ]
            ],
            [
                'slug' => 'register_popup_title',
                'translate' => [
                    $enId => ['title' => 'Register on the website'],
                    $uaId => ['title' => 'Зареєструватися на сайті'],
                ]
            ],
            [
                'slug' => 'register_popup_login_placeholder',
                'translate' => [
                    $enId => ['title' => 'Enter your login'],
                    $uaId => ['title' => 'Введіть логін'],
                ]
            ],
            [
                'slug' => 'register_popup_email_placeholder',
                'translate' => [
                    $enId => ['title' => 'Enter email'],
                    $uaId => ['title' => 'Введіть email'],
                ]
            ],
            [
                'slug' => 'register_popup_password_placeholder',
                'translate' => [
                    $enId => ['title' => 'Enter password'],
                    $uaId => ['title' => 'Введіть пароль'],
                ]
            ],
            [
                'slug' => 'register_popup_repeat_password_placeholder',
                'translate' => [
                    $enId => ['title' => 'Repeat password'],
                    $uaId => ['title' => 'Повторіть пароль'],
                ]
            ],
            [
                'slug' => 'register_popup_sign_up_button',
                'translate' => [
                    $enId => ['title' => 'Sign up'],
                    $uaId => ['title' => 'Зареєструватися'],
                ]
            ],
            [
                'slug' => 'register_popup_sign_in_link',
                'translate' => [
                    $enId => ['title' => 'Enter the site'],
                    $uaId => ['title' => 'Увійти на сайт'],
                ]
            ],
            [
                'slug' => 'register_popup_google_auth',
                'translate' => [
                    $enId => ['title' => 'Or register using'],
                    $uaId => ['title' => 'Або зареєструватися за допомогою'],
                ]
            ],
            [
                'slug' => 'update_profile_popup_title',
                'translate' => [
                    $enId => ['title' => 'Update my data'],
                    $uaId => ['title' => 'Редагувати мої дані'],
                ]
            ],
            [
                'slug' => 'update_profile_first_name_label',
                'translate' => [
                    $enId => ['title' => 'Update first name'],
                    $uaId => ['title' => 'Редагувати ім\'я'],
                ]
            ],
            [
                'slug' => 'update_profile_last_name_label',
                'translate' => [
                    $enId => ['title' => 'Update last name'],
                    $uaId => ['title' => 'Редагувати прізвище'],
                ]
            ],
            [
                'slug' => 'update_profile_login_label',
                'translate' => [
                    $enId => ['title' => 'Update login'],
                    $uaId => ['title' => 'Редагувати логін'],
                ]
            ],
            [
                'slug' => 'update_profile_email_label',
                'translate' => [
                    $enId => ['title' => 'Update email'],
                    $uaId => ['title' => 'Редагувати email'],
                ]
            ],
            [
                'slug' => 'update_profile_password_title',
                'translate' => [
                    $enId => ['title' => 'Update password'],
                    $uaId => ['title' => 'Редагувати пароль'],
                ]
            ],
            [
                'slug' => 'update_profile_old_password_label',
                'translate' => [
                    $enId => ['title' => 'Old password'],
                    $uaId => ['title' => 'Старий пароль'],
                ]
            ],
            [
                'slug' => 'update_profile_new_password_label',
                'translate' => [
                    $enId => ['title' => 'New password'],
                    $uaId => ['title' => 'Новий пароль'],
                ]
            ],
            [
                'slug' => 'update_profile_confirm_new_password_label',
                'translate' => [
                    $enId => ['title' => 'Confirm new password'],
                    $uaId => ['title' => 'Повторіть новий пароль'],
                ]
            ],
            [
                'slug' => 'order_by_popularity',
                'translate' => [
                    $enId => ['title' => 'By popularity'],
                    $uaId => ['title' => 'За популярністю'],
                ]
            ],
            [
                'slug' => 'order_by_oldest',
                'translate' => [
                    $enId => ['title' => 'First the oldest'],
                    $uaId => ['title' => 'Спочатку найдавніші'],
                ]
            ],
            [
                'slug' => 'order_by_newest',
                'translate' => [
                    $enId => ['title' => 'Newest first'],
                    $uaId => ['title' => 'Спочатку найновіші'],
                ]
            ],
            [
                'slug' => 'empty_data_input_placeholder',
                'translate' => [
                    $enId => ['title' => 'There is no data here yet.'],
                    $uaId => ['title' => 'Тут ще немає даних.'],
                ]
            ],
        ];
        foreach ($layouts as $layout) {
            $data = [];
            $data['slug'] = $layout['slug'];
            if (isset($layout['link'])) {
                $data['link'] = $layout['link'];
            }
            $createdLayout = Layouts::create($data);
            foreach ($layout['translate'] as $langId => $translate) {
                LayoutsLang::create([
                    'layouts_id' => $createdLayout->id,
                    'language_id' => $langId,
                    'title' => $translate['title'],
                ]);
            }
        }
    }
}
