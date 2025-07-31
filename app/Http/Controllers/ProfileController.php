<?php

namespace App\Http\Controllers;

use App\Services\ProfileService;
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
}
