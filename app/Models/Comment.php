<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'pattern_id',
        'comment',
        'parent_id',
        'approved'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public static function getCommentsTree($comments = null, $parentId = null): array
    {
        $tree = [];
        foreach ($comments as $comment) {
            if ($comment->parent_id === $parentId) {
                $childTree = self::getCommentsTree($comments, $comment->id);
                if (!empty($childTree)) {
                    $comment->replies = $childTree;
                }
                $tree[] = $comment;
            }
        }

        return $tree;
    }
}
