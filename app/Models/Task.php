<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'section_id',
        'task_id',
        'issue_id',
        'title',
        'description',
        'progress',
        'due_on',
        'start_on',
        'completed_at',
        'completed',
        'completed_by'
    ];
    
    public function project(){        
        return $this->belongsTo(Project::class,'project_id');
    }

    public function labels(){        
        return $this->belongsToMany(Label::class,'task_label','task_id','label_id');
    }
    
    public function assignees(){        
        return $this->belongsToMany(User::class,'user_task','task_id','user_id');
    }
}
