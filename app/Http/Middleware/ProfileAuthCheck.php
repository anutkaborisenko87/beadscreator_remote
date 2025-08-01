<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Vinkla\Hashids\Facades\Hashids;

class ProfileAuthCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authUserId = Auth::user()->id;
        $requestedId = $request->get('id');
        if (!$requestedId) {
            return redirect()->back()->with('error', 'Unauthorized');
        }
        $decodedUserId = Hashids::decode($requestedId);
        $decodedUserId = $decodedUserId[0] ?? null;
        if ($decodedUserId !== $authUserId) {
            return redirect()->back()->with('error', 'Unauthorized');
        }
        return $next($request);
    }
}
