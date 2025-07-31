<?php

namespace App\QueryFilters;

class DraftPatternsSortBy extends BasePatternsSortBy
{
    protected function sortKey(): string
    {
        return $this->filterName();
    }
}
