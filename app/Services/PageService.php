<?php

namespace App\Services;

use App\Helpers\SEO;
use App\Http\Resources\PageDataResource;
use App\Models\Page;

class PageService
{
    public static function getPageData(string $slug): array
    {
        $data = [];
        $page = Page::where('status', true)->with(['translate', 'sections']);

        if ($slug === 'home') {
            $page = $page->where('home', true);
        } else {
            $page = $page->where('slug', $slug);
        }
        $page = $page->first();

        if (!is_null($page)) {
            $page->sections = (new PageSectionsService($page->sections))->getPageSections();
            SEO::generate($page);
            $data = PageDataResource::make($page)->resolve();
        }
        return $data;
    }

}
