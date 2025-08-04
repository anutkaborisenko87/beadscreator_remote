<?php

namespace App\Services;

use App\Http\Resources\PatternGalleryResource;
use App\Models\Pattern;
use App\QueryFilters\DraftPatternsSortBy;
use App\QueryFilters\LikedPatternsSortBy;
use App\QueryFilters\MyPatternsSortBy;
use App\QueryFilters\PatternCategoryFilter;
use App\QueryFilters\PatternsSortBy;
use Illuminate\Pipeline\Pipeline;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Vinkla\Hashids\Facades\Hashids;

class PatternService
{
    public static function getFilteredPatternsForCommonGallery()
    {
        $patterns = Pattern::query()->where('shared', true)->with('user:id,login', 'likes', 'comments');
        return self::getPatternsList($patterns, 'page', PatternsSortBy::class);
    }

    public static function getFilteredPatternsForAuthorGalery(string $userId)
    {
        $decodedUserId = Hashids::decode($userId);
        $decodedUserId = $decodedUserId[0] ?? null;
        if (!$decodedUserId) throw new NotFoundHttpException(__('main.wrong_user_id'));
        $patterns = Pattern::query()->where('shared', true)->whereHas('user', function ($query) use ($decodedUserId) {
            $query->where('user_id', $decodedUserId);
        });
        return self::getPatternsList($patterns, 'page', PatternsSortBy::class);
    }

    public static function getAuthorPatterns(int $authUserId, bool $draft)
    {
        $patterns = Pattern::query()->where('user_id', $authUserId)->where('published', !$draft)->with('user:id,login');
        if (!$draft) $patterns = $patterns->with('likes', 'comments');
        return self::getPatternsList($patterns, $draft ? 'drafts_page' : 'gallery_patterns_page', $draft ? DraftPatternsSortBy::class : MyPatternsSortBy::class);
    }

    public static function getLikedPatterns(int $authUserId)
    {
        $patterns = Pattern::query()->where('published', true)->whereHas('likes', function ($query) use ($authUserId) {
            $query->where('user_id', $authUserId);
        })->with('user:id,login', 'likes', 'comments');
        return self::getPatternsList($patterns, 'likes_page', LikedPatternsSortBy::class);
    }

    private static function getPatternsList($queryBuilder, string $pageName, string $sortByClass): array
    {
        $patterns = app(Pipeline::class)
            ->send($queryBuilder)
            ->through([
                PatternCategoryFilter::class,
                $sortByClass
            ])->thenReturn();
        $patterns = $patterns->paginate(5, ['*'], $pageName);
        $data = PatternGalleryResource::collection($patterns->items())->resolve();
        $response = $patterns->toArray();
        $response['data'] = $data;
        return $response;
    }
}
