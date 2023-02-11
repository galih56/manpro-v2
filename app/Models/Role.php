<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name'
    ];
    
    public function users(){        
        return $this->belongsToMany(Role::class,'user_role','role_id','user_id');
    }
}
