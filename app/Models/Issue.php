<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    protected $fillable = [
        'ticket_code',
        'title',
        'description',
        'requester_name',
        'requested_at',
        'start_on',
        'start_at',
        'started_at',
        'due_on',
        'completed',
        'completed_at',
        'status'
    ];
}
