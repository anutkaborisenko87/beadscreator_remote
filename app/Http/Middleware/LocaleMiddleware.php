<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;

class LocaleMiddleware
{
    private static $locale = false;

    public static function getLocale()
    {
        if (self::$locale === false) {
            $url = parse_url(url()->current(), PHP_URL_PATH);
            $uri = preg_replace(["/^\/api/", "/^\//"], "", $url);
            $segmentsURI = explode("/", $uri, 2);
            if (!Schema::hasTable('languages')) {
                self::$locale = 'en';
                return self::$locale;
            }

            try {
                $languages = Language::getAllEnableLanguages()->pluck('slug')->toArray();
            } catch (\Exception $exception) {
                $languages = [];
                $segmentsURI[0] = Language::getDefaultValue()->slug;
            }
            if (!empty($segmentsURI[0]) &&
                in_array($segmentsURI[0], $languages)
            ) {
                self::$locale = $segmentsURI[0];
            }
            else {
                self::$locale = null;
            }
        }
        return self::$locale;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = self::getLocale();
        if ($locale) {
            App::setLocale($locale);
        } else {
            $mainLanguage = Language::getDefaultValue()->slug;
            App::setLocale($mainLanguage);
        }
        return $next($request);
    }
}
