<?php

namespace App\Http\Middleware;

use App\Models\Language;
use App\Models\Layouts;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = LocaleMiddleware::getLocale();
        $currentLang = Schema::hasTable('languages') ? array_filter(Language::getDropdownList(), function ($item) {
            return $item['current'] === true;
        }) : [];
        $navMenu = Schema::hasTable('languages') ? Page::getNavbarMenu() : [];
        $user = !is_null(auth()->user()) ? auth()->user()->load('roles') : null;
        if (!is_null($user)) {
            $user->setRelation('roles', $user->roles->first());
        }
        $layouts = Schema::hasTable('languages') ? Layouts::with('translate')->get() : [];
        if (!empty($layouts)) {
            $layouts = $layouts->mapWithKeys(function ($item) {
                $data['title'] = $item->translate->title;
                if (!is_null($item->link)) {
                    $data['link'] = $item->link;
                }
                return [$item->slug => $data];

            });
        }

        return array_merge(parent::share($request), [
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
            'langs' => Language::getDropdownList(),
            'user' => $user,
            'url' => is_null($locale) ? $request->getPathInfo() : str_replace("/$locale", "", $request->getPathInfo()),
            'locale' => $locale ?? '',
            'current_lang' => !empty($currentLang) ? array_values($currentLang)[0] : [],
            'nav_menu' => $navMenu,
        ], !empty($layouts) ? $layouts->toArray() : []);
    }
}
