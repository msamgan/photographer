<?php

namespace App\Http\Controllers;

use App\Models\JobType;
use App\Repositories\ClientRepository;
use App\Repositories\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class JobController extends Controller
{
    private ClientRepository $clientRepository;
    private PackageRepository $packageRepository;

    public function __construct(ClientRepository $clientRepository, PackageRepository $packageRepository)
    {
        $this->clientRepository = $clientRepository;
        $this->packageRepository = $packageRepository;
    }

    public function index(): Response|ResponseFactory
    {
        return inertia('Job/Index')->with([
            'jobs' => collect([])
        ]);
    }

    public function create(): Response|ResponseFactory
    {
        return inertia('Job/Create')->with($this->jobAttributes());
    }

    private function jobAttributes(): array
    {
        return [
            'clients' => $this->clientRepository->userClients(auth()->id()),
            'jobTypes' => JobType::userJobType(auth()->user()),
            'packages' => $this->packageRepository->userPackages(auth()->id()),
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'client' => ['required', 'exists:clients,uuid'],
            'job_type' => ['required', 'exists:job_types,uuid'],
            'package_type' => ['required', 'exists:packages,uuid'],
            'charges' => ['required', 'numeric'],
            'initial_deposits' => ['required', 'numeric'],
            'event_name' => ['required', 'array'],
            'event_name.*' => ['required', 'string', 'max:255'],
            'event_date' => ['required', 'array'],
            'event_date.*' => ['required', 'date', 'after_or_equal:today'],
            'event_time' => ['required', 'array'],
            'event_time.*' => ['required', 'date_format:H:i'],
            'event_location' => ['required', 'array'],
            'event_location.*' => ['required', 'string', 'max:255'],
        ]);

        dd($validated);

        return back();
    }
}
