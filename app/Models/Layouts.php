<?php

namespace App\Models;

use App\Traits\Translate;
use Illuminate\Database\Eloquent\Model;

class Layouts extends Model
{
    use Translate;

    protected $fillable = [
        'slug',
        'link'
    ];
}
