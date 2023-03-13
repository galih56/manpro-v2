<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function tasks(){        
        return $this->belongsToMany(Task::class,'task_label','label_id','task_id');
    }
}
