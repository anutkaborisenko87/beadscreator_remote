<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageLang extends Model
{
    protected $fillable = [
        'language_id',
        'title',
        'intro',
        'seo_title',
        'meta_description',
        'meta_robots'
    ];
}
