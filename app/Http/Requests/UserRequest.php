<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // only allow updates if the user is logged in
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $userId = $this->route('id');

        return [
            'login' => 'required|string|min:5|max:255|unique:users,login,' . $userId,
            'firstName' => 'sometimes|nullable|string|min:3|max:255',
            'lastName' => 'sometimes|nullable|string|min:5|max:255',
            'email' => 'required|email|unique:users,email,' . $userId,
            'blocked' => 'sometimes|boolean',
            'roles' => 'required|array',
            'roles.*' => 'numeric|exists:roles,id'
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes(): array
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
    public function messages(): array
    {
        return [
            //
        ];
    }
}
