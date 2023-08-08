<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 */
class UserJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'user_id',
        'client_id',
        'job_type_id',
        'package_id',
        'charges',
        'initial_deposits',
        'status',
    ];

    protected $casts = [
        'charges' => 'decimal:2',
        'initial_deposits' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function jobType(): BelongsTo
    {
        return $this->belongsTo(JobType::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(UserJobEvents::class);
    }
}
