<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 */
class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'name',
        'spouse_name',
        'email',
        'phone',
        'full_address',
    ];

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
