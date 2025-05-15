<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        Auth::login($user);
        $request->session()->regenerate();
        return redirect()->back()->with('success', 'You are logged in');
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->input('email'))->first();
        if ($user->blocked) {
            return redirect()->back()->with('error', 'You are blocked');
        }
        if ($user && $user->password === null) {
            $status = Password::sendResetLink(['email' => $user->email]);

            return $status === Password::RESET_LINK_SENT
                ? redirect()->back()->with('success', 'Ми надіслали вам посилання для встановлення пароля.')
                : redirect()->back()->with('error', 'Сталася помилка при відправці посилання для відновлення пароля.');
        }

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            if ($request->validated()['remember']) {
                $request->session()->keep('remember');
            }
            return redirect()->back()->with('success', 'You are logged in');
        }
        return redirect()->back()->with('error', 'Invalid credentials');

    }

    public function logout()
    {
        Auth::logout();
        return redirect()->back()->with('success', 'Logout successfully');
    }
}
