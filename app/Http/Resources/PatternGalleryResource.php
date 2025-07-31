<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Vinkla\Hashids\Facades\Hashids;

class PatternGalleryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $authUser = auth()->user();
        $requestedAuthor = request()->route('userId');
        $encodedId = Hashids::encode($this->id);
        $galleryUrl = $requestedAuthor === Hashids::encode($this->user->id) ? null : 'gallery/' . Hashids::encode($this->user->id);
        if ($authUser && $authUser->id === $this->user->id) {
            $galleryUrl = 'my-gallery';
        }
        return [
            'id' => $encodedId,
            'title' => $this->title,
            'description' => $this->description,
            'photo' => $this->photo,
            'preview' => $this->preview_image,
            'author' => [
                'name' => $this->user->login,
                'url' => $galleryUrl
            ],
            'comments' => [
                'count' => 0,
                'link' => "editor/" . $encodedId . "/comments"
            ],
            'likes' => [
                "liked" => false,
                'count' => 0
            ],
            'pngLink' => $this->pngLink,
            'jpgLink' => $this->jpgLink

        ];
    }
}
