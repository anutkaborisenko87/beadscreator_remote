<?php

namespace App\Http\Controllers;

use App\Services\PageSectionsService;
use App\Services\PageService;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function indexAuthorGallery(string $userId)
    {
        $pageData = PageService::getPageData('gallery');
        $pageData['data']['sections'] = [
            PageSectionsService::getGalleryAuthorSection($userId),
            ...$pageData['data']['sections']
        ];
        return Inertia::render('Page', $pageData);
    }
}
