<?php

use App\Http\Controllers\Api\EBookController;
use App\Http\Controllers\Api\EKlipingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;
use Illuminate\Support\Str;

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
        Route::get('ebook/{id}/download', [EBookController::class, 'download']);
    });

    // E-kliping routes
    Route::prefix('v2')->group(function () {
        Route::get('ekliping', [EKlipingController::class, 'index']);
        Route::get('ekliping/{slug}', [EKlipingController::class, 'show']);
        Route::post('ekliping', [EKlipingController::class, 'store']);
        Route::put('ekliping/{id}', [EKlipingController::class, 'update']);
        Route::delete('ekliping/{id}', [EKlipingController::class, 'destroy']);
        Route::get('ekliping/{id}/download', [EKlipingController::class, 'download']);
    });

    // Logout
    Route::post('v3/logout', [LoginController::class, 'logout']);
});

// Public routes - no token required
Route::get('test', function () {
    return response()->json(['message' => 'API works!']);
});

// Debug route untuk test validation
Route::post('debug/validate', function (Request $request) {
    return response()->json([
        'headers' => $request->headers->all(),
        'data' => $request->all(),
        'files' => $request->allFiles(),
        'user' => auth('sanctum')->user()
    ]);
})->middleware('auth:sanctum');

// Test JSON endpoint (tanpa file upload)
Route::post('test/ebook-json', function (Request $request) {
    try {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'author' => 'required|string|max:255',
            'reading_time' => 'nullable|integer',
        ]);

        $validated['type'] = 'e-book';
        $validated['slug'] = Str::slug($validated['title']);
        $validated['published_at'] = now();
        
        // Set default values
        if (!isset($validated['description']) || empty($validated['description'])) {
            $validated['description'] = 'Tidak ada deskripsi';
        }
        if (!isset($validated['content']) || empty($validated['content'])) {
            $validated['content'] = 'Konten akan segera tersedia';
        }

        $ebook = \App\Models\Article::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'E-book berhasil dibuat (JSON test)',
            'data' => $ebook
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal',
            'errors' => $e->errors()
        ], 422);
    }
})->middleware('auth:sanctum');

Route::post('v3/login', [LoginController::class, 'login']);