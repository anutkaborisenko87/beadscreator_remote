<?php

namespace App\Services;

use App\Http\Resources\PatternGalleryResource;
use App\Models\Pattern;
use App\QueryFilters\PatternCategoryFilter;
use App\QueryFilters\PatternsSortBy;
use Illuminate\Pipeline\Pipeline;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Vinkla\Hashids\Facades\Hashids;

class PatternService
{
    public static function getFilteredPatternsForCommonGallery()
    {
        $patterns = Pattern::query()->where('shared', true)->with('user');
        return self::getPatternsList($patterns);
    }

    public static function getFilteredPatternsForAuthorGalery(string $userId)
    {
        $decodedUserId = Hashids::decode($userId);
        $decodedUserId = $decodedUserId[0] ?? null;
        if (!$decodedUserId) throw new NotFoundHttpException(__('main.wrong_user_id'));
        $patterns = Pattern::query()->where('shared', true)->whereHas('user', function ($query) use ($decodedUserId) {
            $query->where('user_id', $decodedUserId);
        });
        return self::getPatternsList($patterns);
    }

    private static function getPatternsList($queryBuilder): array
    {
        $patterns = app(Pipeline::class)
            ->send($queryBuilder)
            ->through([
                PatternCategoryFilter::class,
                PatternsSortBy::class
            ])->thenReturn();
        $patterns = $patterns->paginate(5);
        $data = PatternGalleryResource::collection($patterns->items())->resolve();
        $response = $patterns->toArray();
        $response['data'] = $data;
        return $response;
    }
}
