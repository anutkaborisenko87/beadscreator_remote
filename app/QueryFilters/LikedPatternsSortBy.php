<?php

namespace App\QueryFilters;

class LikedPatternsSortBy extends BasePatternsSortBy
{

    protected function sortKey(): string
    {
        return $this->filterName();
    }
}
