<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pattern extends Model
{
    protected $fillable = [
        'title',
        'published',
        'shared',
        'user_id',
        'preview_image',
        'photo',
        'pngLink',
        'jpgLink',
        'pattern_data'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsToMany
    {
        return $this->belongsToMany(PatternCategory::class, 'pattern_categories_patterns', 'pattern_id', 'pattern_category_id');
    }

}
