<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'progress',
        'start_on',
        'due_on',
        'started_at',
        'completed_at',
        'completed_by',
        'completed',
    ];
    
    public function members(){        
        return $this->belongsToMany(User::class,'user_project','project_id','user_id');
    }

    public function tasks(){
        return $this->hasMany(Task::class, 'project_id');
    }

    public function sections(){
        return $this->hasMany(Section::class, 'project_id');
    }
}
