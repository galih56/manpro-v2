<?php

namespace App\Http\Controllers\api;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::get();
        return response()->json($projects);
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'progress' => 'numeric',
            'start_on' => 'nullable|date_format:d-m-Y H:i:s',
            'due_on' => 'nullable|date_format:d-m-Y H:i:s',
            'started_at' => 'nullable|date_format:d-m-Y H:i:s',
            'complated' => 'boolean',
            'completed_at' => 'nullable|date_format:d-m-Y H:i:s',
            'completed_by' => 'nullable|numeric',
        ]);

        $project=Project::create($fields);

        return response()->json([
            'message' => 'Project created',
            'data' => $project,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $project = Project::find($id);

        if(empty($project)){
            return response([
                'message' => "Project not found"
            ],404);
        }
        
        return response()->json(
            $project
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        
        if(empty($project)){
            return response([
                'message' => "Project not found"
            ],404);
        }
        
        $fields=$request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'progress' => 'numeric',
            'start_on' => 'nullable|date_format:d-m-Y H:i:s',
            'due_on' => 'nullable|date_format:d-m-Y H:i:s',
            'started_at' => 'nullable|date_format:d-m-Y H:i:s',
            'complated' => 'boolean',
            'completed_at' => 'nullable|date_format:d-m-Y H:i:s',
            'completed_by' => 'nullable|numeric',
        ]);
        
        $project->update($fields);

        return response()->json([
            'message' => 'Project updated',
            'data' => $project,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        
        if(empty($project)){
            return response([
                'message' => "Project not found"
            ],404);
        }
        $project->delete();
        return response()->json([
            'message' => 'Project deleted'
        ]);
    }
}
