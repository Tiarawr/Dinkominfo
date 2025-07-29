<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
                'description' => 'nullable|string',
                'content' => 'nullable|string',
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120', // Max 5MB
                'published_at' => 'nullable|date',
                'author' => 'required|string|max:255',
                'file' => 'nullable|file|mimes:pdf,doc,docx,epub,txt|max:10240' // Max 10MB
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_image_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('uploads/images', $imageName, 'public');
                $validated['image'] = $imagePath;
            }

            // Handle file upload
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads/ebooks', $fileName, 'public');
                $validated['file_path'] = $filePath;
            }

            // Tambah data default
            $validated['type'] = 'e-book';
            
            // Generate unique slug
            $baseSlug = Str::slug($validated['title']);
            $slug = $baseSlug;
            $counter = 1;
            
            // Check if slug exists and make it unique
            while (Article::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            
            $validated['slug'] = $slug;

            // Set default values untuk field kosong
            if (!isset($validated['description']) || empty($validated['description'])) {
                $validated['description'] = 'Tidak ada deskripsi';
            }
            if (!isset($validated['content']) || empty($validated['content'])) {
                $validated['content'] = 'Konten akan segera tersedia';
            }

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
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
                'published_at' => 'nullable|date',
                'author' => 'sometimes|string|max:255',
                'file' => 'nullable|file|mimes:pdf,doc,docx,epub,txt|max:10240' // Max 10MB
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($ebook->image && Storage::disk('public')->exists($ebook->image)) {
                    Storage::disk('public')->delete($ebook->image);
                }
                
                $image = $request->file('image');
                $imageName = time() . '_image_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('uploads/images', $imageName, 'public');
                $validated['image'] = $imagePath;
            }

            // Handle file upload
            if ($request->hasFile('file')) {
                // Delete old file if exists
                if ($ebook->file_path && Storage::disk('public')->exists($ebook->file_path)) {
                    Storage::disk('public')->delete($ebook->file_path);
                }

                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads/ebooks', $fileName, 'public');
                $validated['file_path'] = $filePath;
            }

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

            // Delete file if exists
            if ($ebook->file_path && Storage::disk('public')->exists($ebook->file_path)) {
                Storage::disk('public')->delete($ebook->file_path);
            }

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

    /**
     * GET - Download file e-book
     */
    public function download($id)
    {
        try {
            $ebook = Article::where('type', 'e-book')->findOrFail($id);

            if (!$ebook->file_path || !Storage::disk('public')->exists($ebook->file_path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File tidak ditemukan'
                ], 404);
            }

            $filePath = Storage::disk('public')->path($ebook->file_path);
            $fileName = basename($ebook->file_path);

            return response()->download($filePath, $fileName);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'E-book tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengunduh file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET - Ambil e-book terbaru untuk homepage (public endpoint)
     */
    public function latest()
    {
        try {
            $latestEbooks = Article::where('type', 'e-book')
                ->whereNotNull('published_at')
                ->orderBy('published_at', 'desc')
                ->take(6) // Ambil 6 e-book terbaru
                ->get(['id', 'title', 'description', 'image', 'published_at', 'author', 'slug'])
                ->map(function ($ebook) {
                    return [
                        'id' => $ebook->id,
                        'title' => $ebook->title,
                        'description' => Str::limit($ebook->description, 150),
                        'image' => $ebook->image ? asset('storage/' . $ebook->image) : null,
                        'published_at' => $ebook->published_at->format('Y-m-d'),
                        'author' => $ebook->author,
                        'slug' => $ebook->slug,
                        'type' => 'e-book',
                        'link' => '/ebooks/' . $ebook->id
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $latestEbooks
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data E-Book terbaru',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
