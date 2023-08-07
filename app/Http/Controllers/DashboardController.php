<?php

namespace App\Http\Controllers;

use App\Repositories\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private PackageRepository $packageRepository;

    public function __construct(PackageRepository $packageRepository)
    {
        $this->packageRepository = $packageRepository;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('Dashboard')->with([
            'packageCount' => $this->packageRepository->userPackagesCount(auth()->id())
        ]);
    }
}
