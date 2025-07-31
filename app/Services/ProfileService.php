<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class ProfileService
{
    public function getProfilePage(): array
    {
        $pageData = PageService::getPageData('gallery');
        $gallerySections = $pageData['data']['sections'];
        $pageData['data']['title'] = __('main.profile_title');
        $pageData["links"] = [
            "self" => "/my-profile",
            "slug" => "my-profile"
        ];
        $newSectionsArray = [];
        $newSectionsArray[] = PageSectionsService::getProfileTitleSection();
        $newSectionsArray[] = PageSectionsService::getProfileUserSection(Auth::user());
        foreach ($gallerySections as $section) {
            foreach ($section['gallery_items'] as $itemKey=>$item) {
                $newSectionsArray[] = [
                    'slug' => $itemKey,
                    'sort_select' => $section['sort_select'],
                    'section_title' => __('main.profile_'.$itemKey . '_title' ),
                    'gallery_items' => $item
                ];
            }
        }
        $pageData['data']['sections'] = $newSectionsArray;
        return $pageData;
    }

}
