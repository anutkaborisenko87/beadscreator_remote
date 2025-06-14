<?php

namespace App\Http\Controllers;

use App\Helpers\SEO;
use App\Http\Resources\PageDataResource;
use App\Models\Page;
use App\Services\PageSectionsService;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function view($slug = true)
    {
        if ($slug === true) {
            $slug = 'home';
        }
        if (is_string($slug) &&
            preg_match("/^[a-z0-9\-\/_]+$/i", $slug)
        ) {
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
                return Inertia::render('Page', $data);
            }

        }
        abort(404);

    }

}
