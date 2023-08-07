<?php

namespace App\Http\Controllers;

use App\Repositories\ClientRepository;
use App\Repositories\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private PackageRepository $packageRepository;
    private ClientRepository $clientRepository;

    public function __construct(PackageRepository $packageRepository, ClientRepository $clientRepository)
    {
        $this->packageRepository = $packageRepository;
        $this->clientRepository = $clientRepository;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('Dashboard')->with([
            'packageCount' => $this->packageRepository->userPackagesCount(auth()->id()),
            'clientCount' => $this->clientRepository->userClientsCount(auth()->id())
        ]);
    }
}
