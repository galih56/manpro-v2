<?php

namespace App\Http\Controllers\api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
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
            'start_on' => 'nullable|date_format:Y-m-d H:i:s',
            'due_on' => 'nullable|date_format:Y-m-d H:i:s',
            'started_at' => 'nullable|date_format:Y-m-d H:i:s',
            'complated' => 'boolean',
            'completed_at' => 'nullable|date_format:Y-m-d H:i:s',
            'completed_by' => 'nullable|numeric',
        ]);

        $task=Task::create($fields);

        return response()->json([
            'message' => 'Task created',
            'task' => $task,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $task = Task::find($id);

        if(empty($task)){
            return response([
                'message' => "Task not found"
            ],404);
        }
        
        return response()->json(
            $task
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        
        if(empty($task)){
            return response([
                'message' => "Task not found"
            ],404);
        }
        
        $fields=$request->validate([
            'project_id' => 'required',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'progress' => 'numeric',
            'start_on' => 'nullable|date_format:Y-m-d H:i:s',
            'due_on' => 'nullable|date_format:Y-m-d H:i:s',
            'started_at' => 'nullable|date_format:Y-m-d H:i:s',
            'complated' => 'boolean',
            'completed_at' => 'nullable|date_format:Y-m-d H:i:s',
            'completed_by' => 'nullable|numeric',
        ]);
        
        $task->update($fields);
        
        return response()->json([
            'message' => 'Task updated',
            'task' => $task,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        
        if(empty($task)){
            return response([
                'message' => "Task not found"
            ],404);
        }
        $task->delete();
        return response()->json([
            'message' => 'Task deleted'
        ]);
    }
}
