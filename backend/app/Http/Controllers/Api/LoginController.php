<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'username' => 'required|string',
                'password' => 'required|string|min:8'
            ]);

            // Check if user exists
            $user = \App\Models\User::where('username', $credentials['username'])->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User tidak ditemukan!'
                ], 404);
            }

            // Use Laravel's Auth::attempt which handles password hashing
            if (!Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Password salah!'
                ], 401);
            }

            // Get authenticated user
            $authUser = $request->user();
            $token = $authUser->createToken('api-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'user' => $authUser,
                'token' => $token // Real Bearer token
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        // Delete the current access token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil'
        ]);
    }
}
