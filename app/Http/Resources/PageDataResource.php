<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => [
                'id' => $this->id,
                'title' => env('APP_NAME') . " :: " .$this->translate->title,
                'intro' => $this->translate->intro,
                'date' => $this->publish_up,
                'sections' => $this->sections->toArray(),
            ],
            'meta' => [
                'seo' => [
                    'title' => $this->translate->seo_title ?? false,
                    'description' => $this->translate->meta_description ?? false,
                    'robots' => $this->translate->meta_robots ?? false,
                ]
            ],
            'links' => [
                'self' => "/" . $this->slug,
                'slug' => $this->slug
            ]
        ];
    }
}
