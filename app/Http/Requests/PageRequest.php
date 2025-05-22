<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is logged in
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'translate' => 'required|array',
            'translate.*.title' => 'required|string|min:3|max:255',
            'translate.*.intro' => 'required|string|min:3|max:255',
            'translate.*.seo_title' => 'sometimes|string|nullable|max:255',
            'translate.*.meta_description' => 'sometimes|nullable',
            'translate.*.meta_robots' => 'sometimes|nullable|max:255',
            'home' => 'sometimes|boolean',
            'status' => 'sometimes|boolean',
            'publish_up' => 'required|date'
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            //
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
        ];
    }
}
