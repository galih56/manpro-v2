<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Storage;
use File;
use App\Services\GoogleSheet;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {  
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function synchronize(){
        
        $google_sheet=new GoogleSheet();
        $google_sheet->spreadsheet_id="1XS_eatNnLiwCh4jumUloAij0jvY25Y1_v-SuXW-70BU";
        $google_sheet->sheet_title="List Request";
        $google_sheet->row_start=4;
        $google_sheet->syncMaintenanceRequests();
        // https://docs.google.com/spreadsheets/d/1F2V5pjcyCfvrgoNYYQ4X72BQSlsSyJ2PIkSwDI5RNZc/edit?usp=sharing
        // link track request dari galihindra650 https://docs.google.com/spreadsheets/d/1YBXOtA5rr-Q2C6-d-KXP6WDGSh_LuXXy/edit?usp=sharing&ouid=113943486515034012806&rtpof=true&sd=true
        // https://stackoverflow.com/questions/62433283/this-operation-is-not-supported-for-this-document-at-gaxios-nodejs-spreadshe
        // https://docs.google.com/spreadsheets/d/1vZXWL8Qg4DQCawZ0amcyt1InvAh9VG3m/edit?usp=sharing&ouid=114050754017932379050&rtpof=true&sd=true
        return Sheets::spreadsheet()->sheet("List Request")->all(); 
    }
}
