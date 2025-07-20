<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PagesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::get('auth/google/redirect', [\App\Http\Controllers\Auth\GoogleAuthController::class, 'redirect'])->name('google-auth');
Route::get('auth/google/callback', [\App\Http\Controllers\Auth\GoogleAuthController::class, 'callbackGoogle']);
Route::get('/gallery/{userId}', [\App\Http\Controllers\GalleryController::class, 'indexAuthorGallery'])
    ->where('userId', '[A-Za-z0-9\-_]+');
Route::get('/{slug?}', [PagesController::class, 'view'])
    ->where('slug', '[A-Za-z0-9\-/_]+')
    ->name('page');

