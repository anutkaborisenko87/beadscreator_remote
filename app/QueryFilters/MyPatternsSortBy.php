<?php

namespace App\QueryFilters;

class MyPatternsSortBy extends BasePatternsSortBy
{

    protected function sortKey(): string
    {
        return $this->filterName();
    }
}
