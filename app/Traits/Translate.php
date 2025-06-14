<?php

namespace App\Traits;

use App\Models\Language;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait Translate
{
    public function translate(int $lang_id = 0): HasOne
    {
        if ($lang_id === 0) {
            $locale = app()->getLocale();
            $language = Language::where('slug', $locale)->first() ?? Language::where('default', true)->first();
            $lang_id = $language->id;
        }

        $modelName = class_basename($this);
        $translationClass = "App\\Models\\{$modelName}Lang";

        return $this->hasOne($translationClass)->where('language_id', $lang_id);
    }


}
