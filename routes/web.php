<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::group(['prefix' => App\Http\Middleware\LocaleMiddleware::getLocale()], function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register'])->name('register');

    Route::get('/', function () {
        return Inertia::render('Home');
    });

    Route::get('/galery', function () {
        return Inertia::render('Galery');
    });

    Route::get('/aboutus', function () {
        return Inertia::render('AboutUs');
    });

    Route::get('/editor', function () {
        return Inertia::render('Editor');
    });

    Route::get('auth/google/redirect', [\App\Http\Controllers\Auth\GoogleAuthController::class, 'redirect'])->name('google-auth');
    Route::get('auth/google/callback', [\App\Http\Controllers\Auth\GoogleAuthController::class, 'callbackGoogle']);

});
