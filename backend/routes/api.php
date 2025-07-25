<?php

use App\Http\Controllers\Api\EBookController;
use App\Http\Controllers\Api\EKlipingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;

// Protected routes - require Bearer token
Route::middleware('auth:sanctum')->group(function () {
    
    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // E-book routes
    Route::prefix('v1')->group(function () {
        Route::get('ebook', [EBookController::class, 'index']);
        Route::get('ebook/{slug}', [EBookController::class, 'show']);
        Route::post('ebook', [EBookController::class, 'store']);
        Route::put('ebook/{id}', [EBookController::class, 'update']);
        Route::delete('ebook/{id}', [EBookController::class, 'destroy']);
    });

    // E-kliping routes
    Route::prefix('v2')->group(function () {
        Route::get('ekliping', [EKlipingController::class, 'index']);
        Route::get('ekliping/{slug}', [EKlipingController::class, 'show']);
        Route::post('ekliping', [EKlipingController::class, 'store']);
        Route::put('ekliping/{id}', [EKlipingController::class, 'update']);
        Route::delete('ekliping/{id}', [EKlipingController::class, 'destroy']);
    });

    // Logout
    Route::post('v3/logout', [LoginController::class, 'logout']);
});

// Public routes - no token required
Route::get('test', function () {
    return response()->json(['message' => 'API works!']);
});

Route::post('v3/login', [LoginController::class, 'login']);