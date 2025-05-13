<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'login' => 'required|string|min:5|max:255|unique:users,login',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:50',
            'confirmPassword' => 'required|string|min:8|max:50|same:password',
        ];
    }
}
