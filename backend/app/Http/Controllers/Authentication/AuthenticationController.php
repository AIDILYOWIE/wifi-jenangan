<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'credentials' => ['required'],
            'password' => ['required']
        ]);

        $login_data = $request->only(['credentials', 'password']);

        $valid_credentials = User::with('role')->where('email', $login_data['credentials'])->first();
        
        if ($valid_credentials && Hash::check($login_data['password'], $valid_credentials->password)){
            Auth::login($valid_credentials);
            $token = $valid_credentials->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'message' => 'login berhasil!',
                'token' => $token,
                'role' => $valid_credentials->role?->name
            ], 202);
        }

        return response()->json([
            'message' => 'email atau password salah!'
        ], 401);

    }

    public function confirmEmail (Request $request) {
        $request->validate([
            'email' => ['required'],
        ]);

        $input = $request->only('email');
        $email = $input['email'];

        if (User::where('email', $email)->first()) {
            return response()->json([
                'status' => true,
                'message' => 'email terkonfirmasi',
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'email tidak terkonfirmasi',
        ], 400);
    }

    public function changePassword(Request $request) {
    
        $request->validate([
            'email' => ['required'],
            'old_password' => ['required'],
            'new_password' => ['required'],
            'confirm_new_password' => ['required', 'same:new_password']
        ]);

        $data = $request->only(['email', 'old_password', 'new_password', 'confirm_new_password']);
        $user = User::where('email', $data['email'])->first();
        $confirmed_old_password = Hash::check($data['old_password'], $user->password);

        if (!$confirmed_old_password) {
            return response()->json([
                'message' => "Gagal merubah password",
                'errors' => 'Password lama salah!'
            ], 400);
        }

        try {
            $user->password = bcrypt($data['new_password']);
            $user->save();
            return response()->json([
                'message' => "Password berhasil diubah"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Password tidak dapat diubah!",
                'errors' => $e->getMessage()
            ]);
        }
        
    }

}
