<?php

namespace App\Http\Controllers;

use App\Http\Requests\PofileDataRequest;
use App\Services\ProfileService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(private ProfileService $profileService) {

    }
    public function index(): Response
    {
        return Inertia::render('Page', $this->profileService->getProfilePage());
    }
    public function edit(): JsonResponse
    {
        return response()->json($this->profileService->getAuthUserData());
    }
    public function update(PofileDataRequest $request): RedirectResponse
    {
        try {
            $this->profileService->updateAuthUserData($request->validated());
            return redirect()->back()->with('success', __('main.profile_updated'));
        } catch (Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }

    }
}
