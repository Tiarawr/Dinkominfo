<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Article;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
            // Debug logging
            Log::info('EKliping store request:', [
                'all_data' => $request->all(),
                'files' => $request->allFiles(),
                'headers' => $request->headers->all(),
                'user' => auth('sanctum')->user()
            ]);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'content' => 'nullable|string',
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120', // Max 5MB
                'published_at' => 'nullable|date',
                'author' => 'required|string|max:255',
                'reading_time' => 'nullable|integer',
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
                $filePath = $file->storeAs('uploads/ekliping', $fileName, 'public');
                $validated['file_path'] = $filePath;
            }

            $validated['type'] = 'e-kliping';
            $validated['slug'] = Str::slug($validated['title']);

            // Set default values untuk field kosong
            if (!isset($validated['description']) || empty($validated['description'])) {
                $validated['description'] = 'Tidak ada deskripsi';
            }
            if (!isset($validated['content']) || empty($validated['content'])) {
                $validated['content'] = 'Konten akan segera tersedia';
            }

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
            Log::error('EKliping validation failed:', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
                'debug_data' => $request->all() // Tambah untuk debug
            ], 422);
        } catch (\Exception $e) {
            Log::error('EKliping store error:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
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
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
                'published_at' => 'nullable|date',
                'author' => 'sometimes|string|max:255',
                'reading_time' => 'sometimes|integer',
                'file' => 'nullable|file|mimes:pdf,doc,docx,epub,txt|max:10240' // Max 10MB
            ]);

            // Handle file upload
            if ($request->hasFile('file')) {
                // Delete old file if exists
                if ($ekliping->file_path && Storage::disk('public')->exists($ekliping->file_path)) {
                    Storage::disk('public')->delete($ekliping->file_path);
                }
                
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads/ekliping', $fileName, 'public');
                $validated['file_path'] = $filePath;
            }

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
            
            // Delete file if exists
            if ($ekliping->file_path && Storage::disk('public')->exists($ekliping->file_path)) {
                Storage::disk('public')->delete($ekliping->file_path);
            }
            
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

    /**
     * GET - Download file e-kliping
     */
    public function download($id)
    {
        try {
            $ekliping = Article::where('type', 'e-kliping')->findOrFail($id);
            
            if (!$ekliping->file_path || !Storage::disk('public')->exists($ekliping->file_path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File tidak ditemukan'
                ], 404);
            }

            $filePath = Storage::disk('public')->path($ekliping->file_path);
            $fileName = basename($ekliping->file_path);

            return response()->download($filePath, $fileName);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'E-kliping tidak ditemukan'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengunduh file',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
