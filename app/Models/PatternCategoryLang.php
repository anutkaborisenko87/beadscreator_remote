<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatternCategoryLang extends Model
{
    protected $fillable = [
        'pattern_category_id',
        'language_id',
        'title',
    ];

}
