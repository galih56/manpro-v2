<?php

namespace App\Http\Controllers\api;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
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
            'name' => 'required|string',
            'code' => 'required|string',
        ]);

        $role=Role::create($fields);
        return response()->json([
            'message' => 'Role created',
            'data' => $role,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);

        if(empty($role)){
            return response([
                'message' => "Role not found"
            ],404);
        }
        
        return response()->json(
            $role
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        
        if(empty($role)){
            return response([
                'message' => "Role not found"
            ],404);
        }
        
        $fields=$request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string',
        ]);
        
        $role->update($fields);
        
        return response()->json([
            'message' => 'Role updated',
            'data' => $role,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::find($id);
        
        if(empty($role)){
            return response([
                'message' => "Role not found"
            ],404);
        }
        $role->delete();
        return response()->json([
            'message' => 'Role deleted'
        ]);
    }
}
