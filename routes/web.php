<?php

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

Route::get('/', function () {
    return Inertia::render('Home', ['url' => '/']);
});

Route::get('/galery', function () {
    return Inertia::render('Galery', ['url' => '/galery']);
});

Route::get('/aboutus', function () {
    return Inertia::render('AboutUs', ['url' => '/aboutus']);
});

Route::get('/editor', function () {
    return Inertia::render('Editor', ['url' => '/editor']);
});

