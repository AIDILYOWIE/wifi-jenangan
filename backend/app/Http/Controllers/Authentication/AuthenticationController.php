<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'credentials' => ['required'],
            'password' => ['required']
        ]);

        $login_data = $request->only(['credentials', 'password']);

        $valid_credentials = User::where('name', $login_data['credentials'] )->orWhere('email', $login_data['credentials'])->first();

        if (!$valid_credentials) {
            return response()->json([
                'message' => 'username atau email salah!'
            ], 401);
        }

        $valid_password = Hash::check($login_data['password'], $valid_credentials->password);

        if (!$valid_password) {
            return response()->json([
                'message' => 'password salah!'
            ], 401);
            
        }

        $token = $valid_credentials->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'message' => 'login berhasil!',
            'token' => $token
        ], 202);
        
    }

    public function forgotPassword (Request $request) {
        $request->validate([
            'credentials' => ['required'],
            'old_password' => ['required'],
            'new_password' => ['required', 'min:8'],
            'confirm_password' => ['required', 'min:8', 'same:new_password']
        ]);
    }

}
