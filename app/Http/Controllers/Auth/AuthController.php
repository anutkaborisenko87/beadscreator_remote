<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\App;
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
        $user->assignRole('user');
        Auth::login($user);
        $request->session()->regenerate();
        return redirect()->back()->with('success', __('auth.register_success'));
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->input('email'))->first();
        if ($user->blocked) {
            return redirect()->back()->with('error', __('auth.blocked_user'));
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
            return redirect()->back()->with('success', __('auth.logged_in'));
        }
        return redirect()->back()->with('error', __('auth.invalid_credentials'));

    }

    public function logout()
    {
        Auth::logout();
        $previousUrl = url()->previous();

        $protectedPaths = config('protected_paths.logout_redirect_exceptions', []);
        $isProtected = false;
        foreach ($protectedPaths as $path) {
            if (strpos($previousUrl, $path) !== false) {
                $isProtected = true;
                break;
            }
        }

        $redirectUrl = $isProtected ? '/' : $previousUrl;

        return redirect($redirectUrl)->with('success', __('auth.logged_out'));

    }
}
