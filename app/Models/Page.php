<?php

namespace App\Models;

use App\Traits\Translate;
use Backpack\CRUD\app\Models\Traits\CrudTrait;
use App\Http\Resources\PagesResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
{
    use CrudTrait;
    use Translate;
    protected $fillable = [
        'slug',
        'home',
        'publish_up',
        'status',
        'deletable'
    ];

    public static function getNavbarMenu(): array
    {
        $availablePages = self::orderBy('home', 'desc')->where('status', true)->with('translate')->get();
        return PagesResource::collection($availablePages)->resolve();
    }

    public static function createTranslation(array $data, self $page): void
    {
        foreach ($data as $key => $value) {
            $page->translate()->create([...$value, 'language_id' => $key]);
        }
    }

    public static function updateTranslation(array $data, self $page): void
    {
        foreach ($data as $key => $value) {
            $translation = $page->translate($key)->first();
            if ($translation) {
                $translation->update([...$value]);
            } else {
                $page->translate()->create([...$value, 'language_id' => $key]);
            }
        }
    }

    public function sections(): HasMany
    {
        return $this->hasMany(PageSection::class)->with('translate');
    }
}
