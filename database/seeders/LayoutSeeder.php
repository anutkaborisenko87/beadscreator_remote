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
