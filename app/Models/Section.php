<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = [
        'project_id',
        'title',
        'description'
    ];

    
    public function project(){        
        return $this->belongsTo(Project::class,'project_id');
    }

    public function tasks(){
        return $this->hasMany(Task::class, 'section_id');
    }
}
