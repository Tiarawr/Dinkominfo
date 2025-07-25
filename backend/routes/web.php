<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;

Route::get('/', function () {
    return (view('welcome'));
});


Route::get('/article', function () {
    return view('article');
});