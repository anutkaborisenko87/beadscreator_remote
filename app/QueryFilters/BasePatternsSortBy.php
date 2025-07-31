<?php

namespace App\QueryFilters;

use Illuminate\Database\Eloquent\Builder;

abstract class BasePatternsSortBy extends MainQueryFilter
{
    abstract protected function sortKey(): string;

    public function applyFilter($builder, $request): Builder
    {
        $filterValue = $request->get($this->sortKey());

        switch ($filterValue) {
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
