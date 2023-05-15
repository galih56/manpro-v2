<?php

namespace App\Http\Controllers\api;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sections = Section::with('tasks')->with('project')->get();
        return response()->json($sections);
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
            'project_id' => 'required',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'progress' => 'numeric',
            'start_on' => 'nullable|date_format:d-m-Y H:i:s',
            'due_on' => 'nullable|date_format:d-m-Y H:i:s',
            'started_at' => 'nullable|date_format:d-m-Y H:i:s',
            'complated' => 'boolean',
            'completed_at' => 'nullable|date_format:d-m-Y H:i:s',
            'completed_by' => 'nullable|numeric',
            'tags' => 'array',
            'tags.*' => 'numeric|distinct'
        ]);

        $section=Section::create($fields);

        return response()->json([
            'message' => 'Task created',
            'data' => $section,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $section = Section::with('tasks')->find($id);

        if(empty($section)){
            return response([
                'message' => "Section not found"
            ],404);
        }
        
        return response()->json(
            $section
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        
        if(empty($section)){
            return response([
                'message' => "Section not found"
            ],404);
        }
        
        $fields=$request->validate([
            'project_id' => 'nullable',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'progress' => 'numeric',
            'start_on' => 'nullable|date_format:d-m-Y H:i:s',
            'due_on' => 'nullable|date_format:d-m-Y H:i:s',
            'started_at' => 'nullable|date_format:d-m-Y H:i:s',
            'complated' => 'boolean',
            'completed_at' => 'nullable|date_format:d-m-Y H:i:s',
            'completed_by' => 'nullable|numeric',
            'tasks' => 'nullable|array',
            'tasks.*' => 'numeric|distinct'
        ]);
        
        $section->update($fields);

        return response()->json([
            'message' => 'Section updated',
            'data' => $section,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $section = Section::find($id);
        
        if(empty($section)){
            return response([
                'message' => "Section not found"
            ],404);
        }
        $section->delete();
        return response()->json([
            'message' => 'Section deleted'
        ]);
    }
}
