<?php

namespace App\Models;

use App\Traits\Translate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PatternCategory extends Model
{
    use Translate;
    protected $fillable = [
        'parent_id'
    ];

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public static function getCategoryTree($categories = null, $parentId = null): array
    {
        if (is_null($categories)) {
            $categories = self::with('translate')->get();
        }
        $tree = [];
        foreach ($categories as $category) {
            if ($category->parent_id === $parentId) {
                $childTree = self::getCategoryTree($categories, $category->id);
                if (!empty($childTree)) {
                    $category->children_tree = $childTree;
                }
                $tree[] = $category;
            }
        }

        return $tree;
    }

}
