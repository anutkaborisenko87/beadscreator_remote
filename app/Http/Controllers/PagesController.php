<?php

namespace App\Http\Controllers;

use App\Helpers\SEO;
use App\Http\Resources\PageDataResource;
use App\Models\Page;
use App\Services\PageSectionsService;
use App\Services\PageService;
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
            $data = PageService::getPageData($slug);
            if (!empty($data)) {
                return Inertia::render('Page', $data);
            }

        }
        abort(404);

    }

}
