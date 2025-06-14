<?php

namespace App\Models;

use App\Traits\Translate;
use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    use Translate;
    protected $fillable = [
        'slug',
        'page_id',
        'validation_rules',
        'order'
    ];
}
