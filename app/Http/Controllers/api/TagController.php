<?php

namespace App\Http\Controllers\api;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags);
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
            'description' => 'required|string',
        ]);

        $tag=Tag::create($fields);
        return response()->json([
            'message' => 'Tag created',
            'data' => $tag,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tag = Tag::find($id);

        if(empty($tag)){
            return response([
                'message' => "Tag not found"
            ],404);
        }
        
        return response()->json(
            $tag
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tag = Tag::find($id);
        
        if(empty($tag)){
            return response([
                'message' => "Tag not found"
            ],404);
        }
        
        $fields=$request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        
        $tag->update($fields);
        
        return response()->json([
            'message' => 'Tag updated',
            'data' => $tag,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tag = Tag::find($id);
        
        if(empty($tag)){
            return response([
                'message' => "Tag not found"
            ],404);
        }
        $tag->delete();
        return response()->json([
            'message' => 'Tag deleted'
        ]);
    }
}
