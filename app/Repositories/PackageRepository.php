<?php

namespace App\Repositories;

use App\Models\Package;
use App\Models\PackageService;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PackageRepository
{
    public function __construct()
    {
        //
    }

    public function store(
        int $userId,
        string $name,
        float $charges,
        float $initialDeposits,
        string $description = null,
    ): Package {
        return Package::create([
            'uuid' => Str::uuid()->toString(),
            'name' => strtolower($name),
            'description' => strtolower($description),
            'charges' => $charges,
            'initial_deposits' => $initialDeposits,
            'user_id' => $userId,
        ]);
    }

    public function update(
        Package $package,
        string $name,
        float $charges,
        float $initialDeposits,
        string $description = null,
    ): Package {
        $package->update([
            'name' => strtolower($name),
            'description' => strtolower($description),
            'charges' => $charges,
            'initial_deposits' => $initialDeposits,
        ]);

        return $package;
    }

    /**
     * @return Builder[]|Collection
     */
    public function userPackages($userId): Collection|array
    {
        return Package::query()
            ->with('services')
            ->select(['uuid', 'name', 'description', 'charges', 'initial_deposits', 'id'])
            ->where('user_id', $userId)->get();
    }

    public function userPackagesCount($userId): int
    {
        return Package::query()->where('user_id', $userId)->count();
    }

    public function storeServicesStore(Package $package, $servicesData): bool
    {
        DB::beginTransaction();
        try {
            PackageService::query()->where('package_id', $package->id)->delete();
            $services = collect($servicesData['name'])->map(function ($name, $index) use ($servicesData, $package) {
                return [
                    'name' => strtolower($name),
                    'description' => strtolower($servicesData['description'][$index]),
                    'package_id' => $package->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            PackageService::query()->insert($services->toArray());

            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollBack();

            return false;
        }
    }

    /**
     * @throws Exception
     */
    public function replicate($package): Builder|array|Collection|Model
    {
        DB::beginTransaction();

        try {
            $package = Package::query()->with('services')->find($package->id);

            $newPackage = Package::create([
                'uuid' => Str::uuid()->toString(),
                'name' => $package->name.' (replicated)',
                'description' => $package->description,
                'charges' => $package->charges,
                'initial_deposits' => $package->initial_deposits,
                'user_id' => auth()->id(),
            ]);

            if ($package->services->isEmpty()) {
                return $newPackage;
            }

            $services = $package->services->map(function ($service) use ($newPackage) {
                return [
                    'name' => $service->name,
                    'description' => $service->description,
                    'package_id' => $newPackage->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            PackageService::query()->insert($services->toArray());

            DB::commit();

            return $package;
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
