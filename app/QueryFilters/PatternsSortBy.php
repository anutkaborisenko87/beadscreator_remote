<?php

namespace App\QueryFilters;

use Illuminate\Database\Eloquent\Builder;

class PatternsSortBy extends MainQueryFilter
{

    public function applyFilter($builder, $request): Builder
    {
        switch ($request->get($this->filterName())) {
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
        return $builder->orderBy($orderBy, $order);
    }
}
