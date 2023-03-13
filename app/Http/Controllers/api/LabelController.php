<?php

namespace App\Http\Controllers\api;

use App\Models\Label;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LabelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $labels = Label::all();
        return response()->json($labels);
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

        $label=Label::create($fields);
        return response()->json([
            'message' => 'Label created',
            'data' => $label,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $label = Label::find($id);

        if(empty($label)){
            return response([
                'message' => "Label not found"
            ],404);
        }
        
        return response()->json(
            $label
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $label = Label::find($id);
        
        if(empty($label)){
            return response([
                'message' => "Label not found"
            ],404);
        }
        
        $fields=$request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        
        $label->update($fields);
        
        return response()->json([
            'message' => 'Label updated',
            'data' => $label,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Label  $label
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $label = Label::find($id);
        
        if(empty($label)){
            return response([
                'message' => "Label not found"
            ],404);
        }
        $label->delete();
        return response()->json([
            'message' => 'Label deleted'
        ]);
    }
}
