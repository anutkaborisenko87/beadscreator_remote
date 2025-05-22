<?php

namespace App\Helpers;

use App\Models\ECategory;
use App\Models\ECategoryLang;
use App\Models\Language;
use App\Models\Languages;
use Illuminate\Support\Facades\Cache;

class SEO
{
    protected static $meta = [];

    public static function generate($obj)
    {
        if (is_object($obj)) {
            $lang = Language::getCurrent();
            $appName = env('APP_NAME');
            $appUrl = env('APP_URL');
            self::addMeta('robots', 'index, follow');

            if (isset($obj->meta_robots) && !empty($obj->meta_robots)) {
                self::addMeta('robots', $obj->meta_robots);
            }

            if (isset($obj->translate->title)) {
                $title  = (isset($obj->translate->seo_title) && !empty($obj->translate->seo_title)) ? $obj->translate->seo_title : $obj->translate->title;
                self::addMeta('title', $title);

                self::addMeta('twitter:title', $title);
                self::addMeta('twitter:site', $appUrl);
                self::addMeta('og:title', $title);
                self::addMeta('og:site_name', $appName);
                self::addMeta('og:type', 'article');
            }

            if (isset($obj->translate->meta_description)) {
                self::addMeta('description', $obj->translate->meta_description);
                self::addMeta('og:description', $obj->translate->meta_description);
            }

            if (isset($lang['locale'])) {
                self::addMeta('og:locale', str_replace("-", "_", $lang['locale']));
            }
        }
    }

    public static function addMeta($key, $content)
    {
        self::$meta[$key] = $content;
    }

    public static function getValue($key)
    {
        return self::$meta[$key] ?? '';
    }

    public static function render()
    {
        if (isset(self::$meta['title'])) {
            $title = self::$meta['title'];
            unset(self::$meta['title']);
        }
        else {
            $title = env('APP_NAME');
        }

        $html = '<title inertia>'. $title .'</title>'. PHP_EOL;
        $html .= '<meta name="generator" content="annaBorysenko">'. PHP_EOL;

        foreach (self::$meta as $item) {
            $html .= $item . PHP_EOL;
        }
        return $html;
    }
}
