<?php

namespace App\Services;

use App\Models\MaintenanceRequest;
use Sheets;

class GoogleSheet
{
    public string $spreadsheet_id ="";
    public string $sheet_title ="";
    public int $row_start=0;

    public function __construct($spreadsheet_id="", $sheet_title="", $row_start=0)
    {
        $this->spreadsheet_id=$spreadsheet_id;
        $this->sheet_title=$sheet_title;
        $this->row_start=$row_start;
    }
    
    public function syncMaintenanceRequests(){
        $sheet_columns = [
            "ticket_code" => 0,
            "title" => 1,
            "description" => 2,
            "requester_name" => 3,
            "requested_at" => 4,
            "status" => 5,
            "due_on" => 6,
            "progress" => 7,
            "completed_at"=> 8
        ];
        
        $check=null;
        try {
            $records=Sheets::spreadsheet($this->spreadsheet_id)->sheet($this->sheet_title)->get();   
            $new_records=[];
            for ($i=$this->row_start; $i < count($records) ; $i++) { 
                $record=$records[$i];
                
                $new_record=[];
                if(isset($record[$sheet_columns["ticket_code"]])) $new_record["ticket_code"] = $record[$sheet_columns["ticket_code"]];
                if(isset($record[$sheet_columns["title"]])) $new_record["title"] = $record[$sheet_columns["title"]];
                if(isset($record[$sheet_columns["description"]])) $new_record["description"] = $record[$sheet_columns["description"]];
                if(isset($record[$sheet_columns["requester_name"]])) $new_record["requester_name"] = $record[$sheet_columns["requester_name"]];
                if(isset($record[$sheet_columns["requested_at"]])) $new_record["requested_at"] = $record[$sheet_columns["requested_at"]];
                if(isset($record[$sheet_columns["status"]])) $new_record["status"] = $record[$sheet_columns["status"]];
                if(isset($record[$sheet_columns["due_on"]])) $new_record["due_on"] = $record[$sheet_columns["due_on"]];
                if(isset($record[$sheet_columns["progress"]])) $new_record["progress"] = $record[$sheet_columns["progress"]];
                if(isset($record[$sheet_columns["completed_at"]])) $new_record["completed_at"] = $record[$sheet_columns["completed_at"]];

                $new_records[]=$new_record;
            }
            dd($new_records);
            // $records=$records->map(function($record){
            //     return [
            //         "ticket_code" =>
            //     ]
            // })
            // MaintenanceRequest::insert($records);
        } catch (\Throwable $th) {
            dd($th,$check);
        }
    }

}
