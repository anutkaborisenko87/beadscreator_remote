<?php


use App\Http\Resources\PatternGalleryResource;
use App\Services\PatternService;
use Illuminate\Support\Facades\Request;

if (!function_exists('getPatternCategoryList')) {
    function getPatternCategoryList(): array
    {
        $categories = \App\Models\PatternCategory::getCategoryTree();
        return \App\Http\Resources\PatternCategoryResource::collection($categories)->resolve();
    }
}

if (!function_exists('getMainRatedPicturesList')) {
    function getMainRatedPicturesList(): array
    {
        return [];
    }
}

if (!function_exists('getMainGalleryItemsList')) {
    function getMainGalleryItemsList(): array
    {
        $userId = request()->route('userId');
        if ($userId) PatternService::getFilteredPatternsForAuthorGalery($userId);
        return PatternService::getFilteredPatternsForCommonGallery();
    }
}

if (!function_exists('getSortByList')) {
    function getSortByList(): array
    {
        $orderByList = \App\Models\Layouts::where('slug', 'LIKE', 'order_by_%')->with('translate')->get();
        $orderByList = $orderByList->map(function ($item) {
            return [
                'id' => str_replace('order_by_', '', $item->slug),
                'name' => $item->translate->title
            ];
        });
        return $orderByList->toArray();
    }
}
