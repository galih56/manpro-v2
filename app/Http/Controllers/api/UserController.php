<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Hash;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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

        return response()->json([
            'message' => 'User created',
            'user' => $user,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if(empty($user)){
            return response([
                'message' => "User not found"
            ],404);
        }
        
        return response()->json(
            $user
        );
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        
        if(empty($user)){
            return response([
                'message' => "User not found"
            ],404);
        }
        
        $fields=$request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|unique:users,email|max:255',
            'password' => 'string|required_with:password_confirmation|same:password_confirmation',
        ]);
        
        $user->update($fields);
        
        return response()->json([
            'message' => 'User updated',
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        
        if(empty($user)){
            return response([
                'message' => "User not found"
            ],404);
        }
        $user->delete();
        return response()->json([
            'message' => 'User deleted'
        ]);
    }
}
