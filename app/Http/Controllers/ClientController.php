<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Repositories\ClientRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class ClientController extends Controller
{
    private ClientRepository $clientRepository;

    public function __construct(ClientRepository $clientRepository)
    {
        $this->clientRepository = $clientRepository;
    }

    public function index(): Response|ResponseFactory
    {
        return inertia('Client/Index')->with([
            'clients' => $this->clientRepository->userClients(auth()->id()),
        ]);
    }

    public function create(): Response|ResponseFactory
    {
        return inertia('Client/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'spouse_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'full_address' => ['required', 'string'],
        ]);

        $this->clientRepository->store(
            auth()->id(),
            $validated['name'],
            $validated['email'],
            $validated['phone'],
            $validated['full_address'],
            $validated['spouse_name'],
        );

        return back();
    }

    public function edit(Client $client): Response|ResponseFactory
    {
        return inertia('Client/Edit')->with([
            'client' => $client,
        ]);
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'spouse_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'full_address' => ['required', 'string'],
        ]);

        $this->clientRepository->update(
            $client,
            $validated['name'],
            $validated['email'],
            $validated['phone'],
            $validated['full_address'],
            $validated['spouse_name'],
        );

        return back();
    }

    public function destroy(Client $client)
    {
        try {
            $client->delete();
            return back();
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Something went wrong']);
        }
    }
}
