<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return (view('welcome'));
});


Route::get('/article', function () {
    return view('article');
});
