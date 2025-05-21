<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use App\Http\Resources\PagesResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Page extends Model
{
    use CrudTrait;
    protected $fillable = [
        'slug',
        'home',
        'publish_up',
        'status',
        'deletable'
    ];

    /**
     * @param int $lang_id
     * @return HasOne
     */
    public function translate(int $lang_id = 0): HasOne
    {
        if ($lang_id === 0) {
            $locale = app()->getLocale();
            $language = Language::where('slug', $locale)->first() ?? Language::where('default', true)->first();
            $lang_id = $language->id;
        }
        return $this->hasOne(PageLang::class)->where('language_id', $lang_id);
    }

    public static function getNavbarMenu(): array
    {
        $availablePages = self::orderBy('home', 'desc')->where('status', true)->with('translate')->get();
        return PagesResource::collection($availablePages)->resolve();
    }

    public static function createTranslation(array $data, self $page)
    {
        foreach ($data as $key => $value) {
            $page->translate()->create([...$value, 'language_id' => $key]);
        }
    }

    public static function updateTranslation(array $data, self $page)
    {
        foreach ($data as $key => $value) {
            $translation = $page->translate($key)->first();
            if ($translation) {
                $translation->update([...$value]);
            } else {
                $page->translate()->create([...$value, 'language_id' => $key]);
            }
        }
    }
}
