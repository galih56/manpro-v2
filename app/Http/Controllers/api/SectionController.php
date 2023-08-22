<?php

namespace App\Http\Controllers\api;

use App\Models\Section;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sections = Section::select('*');

        if($request->search){ 
            $sections = $sections->where(function(Builder $q) use($request){
                            $q->where('title','ilike',"%$request->search%")->orWhere('description','ilike',"%$request->search%");
                        });
        }
        
        $sections = $sections->with('tasks')->with('project')->paginate( $request->limit ?? 15)->withQueryString();
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
        ]);

        $section=Section::create($fields);

        return response()->json([
            'message' => 'Section created',
            'data' => $section,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $section = new Section();
        $section = $section->with('project');

        if($request->tasks && empty($request->subtasks)){
            $section = $section->with("tasks");
        }

        if($request->subtasks){
            $section = $section->with("tasks.tasks");
        }        
        
        if(empty($section)){
            return response([
                'message' => "Section not found"
            ],404);
        }
        
        $section = $section->find($id);

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
            'project_id' => 'required',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
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
