<?php

namespace App\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Vinkla\Hashids\Facades\Hashids;

class PatternCategoryFilter extends MainQueryFilter
{
    public function applyFilter($builder, $request): Builder
    {
        $encodedCategoryId = $request->get($this->filterName());
        $decodedCategoryId = Hashids::decode($encodedCategoryId);
        $categoryId = $decodedCategoryId[0] ?? null;
        if ($categoryId) {
            $builder = $builder->whereHas('category', function ($query) use ($categoryId) {
                $query->where('pattern_category_id', $categoryId);
            });
        }

        return $builder;
    }
}
