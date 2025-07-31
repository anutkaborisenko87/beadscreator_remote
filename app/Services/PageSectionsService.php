<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Vinkla\Hashids\Facades\Hashids;

class PageSectionsService
{
    private Collection $pageSections;
    public function __construct(Collection $pageSections) {
        $this->pageSections = $pageSections;
    }

    public function getPageSections(): Collection
    {
        $this->pageSections = $this->pageSections
            ->map(function ($item) {
                return [
                    'slug' => $item->slug,
                    ... $this->parseSectionRules($item->validation_rules, $item->translate->translation)
                ];
            });

        return $this->pageSections;
    }

    private function parseSectionRules(string $rules, string $translation): Collection
    {
        $rules = json_decode($rules, true);
        $translation = json_decode($translation, true);
        $result = [];
        foreach ($rules as $key => $rule) {
            switch ($rule) {
                case 'string':
                case 'text':
                case 'text_editor':
                    $result[$key] = $translation[$key];
                    break;
                case is_array($rule):
                    $result[$key] = $this->parseSectionRules(json_encode($rule), json_encode($translation[$key]));
                    break;
                case 'function':
                    $result[$key] = $this->parseSectionFunction($translation[$key]);
                    break;

                default: break;
            }
        }

        return collect($result);
    }

    private function parseSectionFunction($functionName)
    {
        return function_exists($functionName) ? $functionName() : [];
    }

    public static function getGalleryAuthorSection(string $userId): array
    {
        $decodedUserId = Hashids::decode($userId);
        $decodedUserId = $decodedUserId[0] ?? null;
        if (!$decodedUserId) throw new NotFoundHttpException(__('main.wrong_user_id'));
        $author = User::findOrFail($decodedUserId);
        return [
            'slug' => 'gallery_author_section',
            'title' => __('main.gallery_author_title'),
            'author_name' => $author->login
        ];
    }

    public static function getProfileTitleSection(): array
    {
        return [
            'slug' => 'profile_title_section',
            'title' => __('main.profile_title')
        ];
    }

    public static function getProfileUserSection(User $user): array
    {
        return [
            'slug' => 'profile_user_section',
            'name_title' => __('main.profile_user_title'),
            'user_name' => $user->firstName . ' ' . $user->lastName,
            'login_title' => __('main.profile_user_login'),
            'user_login' => $user->login,
            'email_title' => __('main.profile_user_email'),
            'user_email' => $user->email
        ];
    }

}
