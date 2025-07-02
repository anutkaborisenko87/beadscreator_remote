<?php


use App\Http\Resources\PatternGalleryResource;
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
        $request = request();
        $patterns = \App\Models\Pattern::query()->where('shared', true);
        if ($request->has('category')) {
            $patterns = $patterns->whereHas('category', function ($query) use ($request) {
               $query->where('id', $request->get('category'));
            });
        }
        if ($request->has('sort')) {
            switch ($request->get('sort')) {
                case 'newest':
                    $orderBy = 'created_at';
                    $order = 'desc';
                    break;
                case 'oldest':
                    $orderBy = 'created_at';
                    $order = 'asc';
                    break;
                case 'popularity':
                    $orderBy = 'id';
                    $order = 'asc';
                    break;
                default:
                    $orderBy = 'id';
                    $order = 'desc';
                    break;
            }
            $patterns = $patterns->orderBy($orderBy, $order);
        }
        $patterns = $patterns->with('user')->paginate(5);
        $data = PatternGalleryResource::collection($patterns->items())->resolve();
        $response = $patterns->toArray();
        $response['data'] = $data;
        return $response;
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
