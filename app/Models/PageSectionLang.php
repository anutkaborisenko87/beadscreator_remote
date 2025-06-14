<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSectionLang extends Model
{
    protected $fillable = [
        'page_section_id',
        'language_id',
        'translation'
    ];
}
