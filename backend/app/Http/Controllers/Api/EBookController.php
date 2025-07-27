<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EBookController extends Controller
{
    public function index(Request $request)
    {
        try {
            $ebook = Article::where('type', 'e-book')
                ->whereNotNull('published_at')
                ->orderBy('published_at', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $ebook
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data E-Book',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * POST - Create e-book baru
     */
    public function store(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'required|string',
                'image' => 'nullable|url',
                'published_at' => 'nullable|date',
                'author' => 'required|string|max:255',
            ]);

            // Tambah data default
            $validated['type'] = 'e-book';
            $validated['slug'] = Str::slug($validated['title']);
            
            // Jika tidak ada published_at, set sekarang
            if (!isset($validated['published_at'])) {
                $validated['published_at'] = now();
            }

            // Create e-book baru
            $ebook = Article::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'E-book berhasil dibuat',
                'data' => $ebook
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
                'message' => 'Gagal membuat e-book',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT - Update e-book
     */
    public function update(Request $request, $id)
    {
        try {
            $ebook = Article::where('type', 'e-book')->findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'content' => 'sometimes|string',
                'image' => 'nullable|url',
                'published_at' => 'nullable|date'
            ]);

            // Update slug jika title berubah
            if (isset($validated['title'])) {
                $validated['slug'] = Str::slug($validated['title']);
            }

            $ebook->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'E-book berhasil diupdate',
                'data' => $ebook->fresh()
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'E-book tidak ditemukan'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui e-book',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE - Hapus e-book
     */
    public function destroy($id)
    {
        try {
            $ebook = Article::where('type', 'e-book')->findOrFail($id);
            $ebook->delete();

            return response()->json([
                'success' => true,
                'message' => 'E-book berhasil dihapus'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'E-book tidak ditemukan'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus e-book',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}