<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserJobEvents extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_job_id',
        'event_name',
        'event_date',
        'event_time',
        'event_location',
    ];

    protected $casts = [
        'event_time' => 'datetime:H:i',
    ];
}
