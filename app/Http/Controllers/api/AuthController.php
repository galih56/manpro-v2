<?php

namespace App\Http\Controllers\api;

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
            'name'=>'required|string|max:255',
            'email'=>'required|string|unique:users,email|max:255',
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
        $user = Auth::user();

        if(empty($user)){
            return response("Unauthenticated",401);
        }

        $user = $user->load(['roles']);
        return response()->json([
            "user" => $user,
        ]);

    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout success'
        ]);
    }
}
