<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 */
class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'charges',
        'user_id',
        'uuid',
    ];

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public function services(): HasMany
    {
        return $this->hasMany(PackageService::class);
    }
}
