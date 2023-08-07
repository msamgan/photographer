<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Repositories\PackageRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    private PackageRepository $packageRepository;

    public function __construct(PackageRepository $packageRepository)
    {
        $this->packageRepository = $packageRepository;
    }

    public function index(): Response
    {
        $packages = $this->packageRepository->userPackages(auth()->id());
        $packages->map(function ($package) {
            return $package->services_count = $package->services->count();
        });

        return Inertia::render('Packages/Index')->with(
            'packagesData',
            $packages
        );
    }

    public function create(): Response
    {
        return Inertia::render('Packages/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'charges' => ['required', 'numeric'],
        ]);

        $this->packageRepository->store(
            auth()->id(),
            $validated['name'],
            $validated['charges'],
            $request->get('description'),
        );

        return back();
    }

    public function edit(Package $package): Response
    {
        return Inertia::render('Packages/Edit')->with('packageData', $package);
    }

    public function update(Package $package): RedirectResponse
    {
        $validated = request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'charges' => ['required', 'numeric'],
        ]);

        $this->packageRepository->update(
            $package,
            $validated['name'],
            $validated['charges'],
            request()->get('description'),
        );

        return back();
    }

    public function packageServices(Package $package): Response
    {
        $package->load('services');

        $package->services = $package->services->map(function ($service) {
            return [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
            ];
        });

        return Inertia::render('Packages/Services')->with('packageData', $package);
    }

    public function packageServicesStore(Package $package, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.*' => ['required', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['required', 'string', 'max:255'],
        ]);

        $storedServices = $this->packageRepository->storeServicesStore(
            $package,
            $validated
        );

        if ($storedServices) {
            return back();
        }

        return back()->withErrors(['error' => 'Something went wrong in saving the services']);
    }

    public function replicate(Package $package): RedirectResponse
    {
        $packageReplicated = $this->packageRepository->replicate($package);

        if ($packageReplicated) {
            return back();
        }

        return back()->withErrors(['error' => 'Something went wrong in replicating the package']);
    }

    public function destroy(Package $package)
    {
        try {
            $package->delete();
            return back();
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Something went wrong']);
        }
    }
}
