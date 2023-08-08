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

    public static function uuidToId($uuid): int|null
    {
        return self::query()->select(['id'])->where('uuid', $uuid)->first()->id ?? null;
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
