<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Language extends Model
{
    use CrudTrait;
    protected $fillable = [
        'name',
        'title',
        'slug',
        'locale',
        'default',
        'status'
    ];

    public static function getAllEnableLanguages()
    {
        return self::where('status', 1)->get();
    }

    public static function getDefaultValue()
    {
        return self::where('default', 1)->first();
    }

    public static function getDropdownList()
    {
        $languages = self::getAllEnableLanguages()->toArray();
        $currentLocale = App::getLocale();
        return array_map(function($item) use ($currentLocale) {
            return [
                'id' => $item['id'],
                'slug' => $item['slug'],
                'title' => $item['title'],
                'name' => $item['name'],
                'current' => $item['slug'] === $currentLocale
            ];
        }, $languages);
    }

}
