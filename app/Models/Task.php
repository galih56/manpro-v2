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
}
