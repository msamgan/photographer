<?php

namespace App\Repositories;

use App\Models\Package;
use App\Models\PackageService;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PackageRepository
{
    public function __construct()
    {
        //
    }

    public function store(
        int    $userId,
        string $name,
        float  $charges,
        string $description = null,
    ): Package
    {
        return Package::create([
            'uuid' => Str::uuid()->toString(),
            'name' => strtolower($name),
            'description' => strtolower($description),
            'charges' => $charges,
            'user_id' => $userId,
        ]);
    }

    public function update(
        Package $package,
        string  $name,
        float   $charges,
        string  $description = null,
    ): Package
    {
        $package->update([
            'name' => strtolower($name),
            'description' => strtolower($description),
            'charges' => $charges,
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
            ->select(['uuid', 'name', 'description', 'charges', 'id'])
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

    public function replicate($package): bool
    {
        DB::beginTransaction();

        try {
            $package = Package::query()->with('services')->find($package->id);

            $newPackage = Package::create([
                'uuid' => Str::uuid()->toString(),
                'name' => $package->name . ' (replicated)',
                'description' => $package->description,
                'charges' => $package->charges,
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

            return true;
        } catch (Exception $e) {
            DB::rollBack();

            return false;
        }
    }
}
