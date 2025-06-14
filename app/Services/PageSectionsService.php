<?php

namespace App\Services;

use Illuminate\Support\Collection;

class PageSectionsService
{
    private Collection $pageSections;
    public function __construct(Collection $pageSections) {
        $this->pageSections = $pageSections;
    }

    public function getPageSections(): Collection
    {
        $this->pageSections = $this->pageSections
            ->map(function ($item) {
                return [
                    'slug' => $item->slug,
                    ... $this->parseSectionRules($item->validation_rules, $item->translate->translation)
                ];
            });

        return $this->pageSections;
    }

    private function parseSectionRules(string $rules, string $translation): Collection
    {
        $rules = json_decode($rules, true);
        $translation = json_decode($translation, true);
        $result = [];
        foreach ($rules as $key => $rule) {
            switch ($rule) {
                case 'string':
                case 'text':
                case 'text_editor':
                    $result[$key] = $translation[$key];
                    break;
                case is_array($rule):
                    $result[$key] = $this->parseSectionRules(json_encode($rule), json_encode($translation[$key]));
                    break;
                case 'function':
                    $result[$key] = $this->parseSectionFunction($translation[$key]);
                    break;

                default: break;
            }
        }

        return collect($result);
    }

    private function parseSectionFunction($functionName)
    {
        return function_exists($functionName) ? $functionName() : [];
    }

}
