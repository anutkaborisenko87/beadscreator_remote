<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckIfAdmin
{
    /**
     * Checked that the logged in user is an administrator.
     *
     * --------------
     * VERY IMPORTANT
     * --------------
     * If you have both regular users and admins inside the same table, change
     * the contents of this method to check that the logged in user
     * is an admin, and not a regular user.
     *
     * Additionally, in Laravel 7+, you should change app/Providers/RouteServiceProvider::HOME
     * which defines the route where a logged in user (but not admin) gets redirected
     * when trying to access an admin route. By default it's '/home' but Backpack
     * does not have a '/home' route, use something you've built for your users
     * (again - users, not admins).
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable|null  $user
     * @return bool
     */
    private function checkIfUserIsAdmin($user)
    {
        $roles = $user->roles;
        if (!$roles instanceof \Illuminate\Support\Collection) {
            $roles = collect([$roles]);
        }
        return $roles->contains(function ($role) {
            return $role->name === 'super_admin';
        });
    }

    /**
     * Answer to unauthorized access request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    private function respondToUnauthorizedRequest($request)
    {
        if ($request->ajax() || $request->wantsJson()) {
            return response(trans('backpack::base.unauthorized'), 401);
        } else if (Auth::user() && !Auth::user()->hasRole('super_admin')) {
            return response(trans('backpack::base.unauthorized'), 401);
        } else {
            return redirect()->guest(backpack_url('login'));
        }
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = backpack_user() ?? Auth::user();
        if (backpack_auth()->guest() && Auth::guest()) {
            return $this->respondToUnauthorizedRequest($request);
        }
        if (backpack_auth()->guest() && !Auth::guest() && $this->checkIfUserIsAdmin($user)) {
            backpack_auth()->login($user);
        }

        if (! $this->checkIfUserIsAdmin($user)) {
            return $this->respondToUnauthorizedRequest($request);
        }

        return $next($request);
    }
}
