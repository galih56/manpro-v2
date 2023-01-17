<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'progress',
        'start_on',
        'due_on',
        'started_at',
        'completed_at',
        'completed_by',
        'completed',
    ];
}
