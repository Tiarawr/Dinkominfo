<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Article;

class EKlipingController extends Controller
{

    public function index(Request $request)
    {
        try {
            $ekliping = Article::where('type', 'e-kliping')
                ->whereNotNull('published_at')
                ->orderBy('published_at', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $ekliping
            ]);
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data E-Kliping',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // POST - create e-kliping
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'required|string',
                'image' => 'nullable|url',
                'published_at' => 'nullable|date',
                'author' => 'required|string|max:255',
                'reading_time' => 'nullable|integer'
            ]);

            $validated['type'] = 'e-kliping';
            $validated['slug'] = Str::slug($validated['title']);

            if (!isset($validated['published_at'])){
                $validated['published_at'] = now();
            }

            $ekliping = Article::create($validated);
            return response()->json([
                'success' => true,
                'message' => 'E-kliping berhasil dibuat',
                'data' => $ekliping
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat e-kliping',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // PUT - Update e-kliping
    public function update(Request $request, $id)
    {
        try {
            $ekliping = Article::where('type', 'e-kliping')->findOrFail($id);
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'content' => 'sometimes|string',
                'image' => 'nullable|url',
                'published_at' => 'nullable|date'
            ]);

            if (isset($validated['title'])){
                $validated['slug'] = Str::slug($validated['title']);
            }

            $ekliping->update($validated);
            return response()->json([
                'success' => true,
                'message' => 'E-kliping berhasil diperbarui',
                'data' => $ekliping->fresh()
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'E-kliping tidak ditemukan',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui e-kliping',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $ekliping = Article::where('type', 'e-kliping')->findOrFail($id);
            $ekliping->delete();
            return response()->json([
                'success' => true,
                'message' => 'E-kliping berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json([
                'success' => false,
                'message' => 'E-kliping tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus e-kliping',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
