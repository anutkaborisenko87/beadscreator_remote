<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use SebastianBergmann\Diff\Exception;

class GoogleAuthController extends Controller
{
    public function redirect(Request $request)
    {
        try {
            $redirectUrl = $request->headers->get('referer') ?? url('/');
            session(['redirect_url' => $redirectUrl]);
            return  Socialite::driver('google')->redirect();
        } catch (Exception $exception) {
            return redirect()->back()->with('error', $exception->getMessage());
        }
    }

    public function callbackGoogle()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = User::where('google_id', $googleUser->getId())->first();
            if (!$user) {
                $user = User::firstOrCreate(['email' => $googleUser->getEmail()],
                    [
                        'login' => $googleUser->getEmail(),
                        'email' => $googleUser->getEmail(),
                        'google_id' => $googleUser->getId(),
                        'avatar' => $googleUser->getAvatar(),
                        'firstName' => $googleUser->getName(),
                        'lastName' => $googleUser->getName(),
                    ]
                );
            }
            if ($user->roles->count() === 0) {
                $user->assignRole('user');
            }
            $redirectUrl = session('redirect_url', url('/'));
            if ($user->blocked) {
                return redirect($redirectUrl)->with('error', __('auth.blocked_user'));
            }
            Auth::login($user);
            session()->forget('redirect_url');
            return redirect($redirectUrl)->with('success', __('auth.logged_in'));
        } catch (Exception $exception) {
            return redirect()->back()->with('error', $exception->getMessage());
        }
    }
}
