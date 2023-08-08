<?php

namespace App\Repositories;

use App\Models\UserJob;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class JobRepository
{
    /**
     * @throws Exception
     */
    public function store(
        int $userId,
        string $name,
        int $clientId,
        int $jobTypeId,
        int $packageId,
        float $charges,
        float $initialDeposits,
        array $eventNames,
        array $eventDates,
        array $eventTimes,
        array $eventLocations
    ): UserJob {

        DB::beginTransaction();

        try {
            $job = UserJob::create([
                'user_id' => $userId,
                'uuid' =>  Str::uuid()->toString(),
                'name' => $name,
                'client_id' => $clientId,
                'job_type_id' => $jobTypeId,
                'package_id' => $packageId,
                'charges' => $charges,
                'initial_deposits' => $initialDeposits,
            ]);

            $job->events()->createMany(
                array_map(function ($eventName, $eventDate, $eventTime, $eventLocation) {
                    return [
                        'uuid' => Str::uuid()->toString(),
                        'event_name' => $eventName,
                        'event_date' => $eventDate,
                        'event_time' => $eventTime,
                        'event_location' => $eventLocation,
                    ];
                }, $eventNames, $eventDates, $eventTimes, $eventLocations)
            );

            DB::commit();

            return $job;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
