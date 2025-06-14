<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LayoutsLang extends Model
{
    protected $fillable = [
        'layouts_id',
        'language_id',
        'title',
    ];
}
