<?php

use App\Http\Controllers\Api\EBookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Test route
Route::get('test', function () {
    return response()->json(['message' => 'API works!']);
});

Route::prefix('v1')->group(function () {
    // GET routes
    Route::get('ebook', [EBookController::class, 'index']);
    Route::get('ebook/{slug}', [EBookController::class, 'show']);
    
    // POST route untuk create e-book baru
    Route::post('ebook', [EBookController::class, 'store']);
    
    // PUT route untuk update e-book
    Route::put('ebook/{id}', [EBookController::class, 'update']);
    
    // DELETE route untuk hapus e-book
    Route::delete('ebook/{id}', [EBookController::class, 'destroy']);
});