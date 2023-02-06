<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use Auth;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $fields=$request->validate([
            'name'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'password' => 'string|required_with:password_confirmation|same:password_confirmation',
        ]);

        $user=User::create([
            'name'=> $fields['name'],
            'email'=> $fields['email'],
            'password'=> Hash::make($fields['password']),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Register success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);

    }

    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'string|required',
        ]); 

        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('manpro-v2')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function me(Request $request){
        return response()->json(Auth::user());

    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout success'
        ]);
    }
}
