<?php

namespace App\Repositories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class ClientRepository
{
    public function __construct()
    {
        //
    }

    public function store(
        int    $userId,
        string $name,
        string $email,
        string $phone,
        string $address,
        string $spouseName = null,
    ): Client
    {
        return Client::create([
            'uuid' => Str::uuid()->toString(),
            'name' => strtolower($name),
            'email' => strtolower($email),
            'phone' => strtolower($phone),
            'full_address' => strtolower($address),
            'spouse_name' => strtolower($spouseName),
            'user_id' => $userId,
        ]);
    }

    public function update(
        Client $client,
        string $name,
        string $email,
        string $phone,
        string $address,
        string $spouseName = null,
    ): Client
    {
        $client->update([
            'name' => strtolower($name),
            'email' => strtolower($email),
            'phone' => strtolower($phone),
            'full_address' => strtolower($address),
            'spouse_name' => strtolower($spouseName),
        ]);

        return $client;
    }



    public function userClients(int $userId): Collection|array
    {
        return Client::query()
            ->select(['uuid', 'name', 'email', 'phone', 'full_address', 'spouse_name', 'id'])
            ->where('user_id', $userId)->get();
    }

    public function userClientsCount(int $userId): int
    {
        return Client::query()
            ->select(['id'])
            ->where('user_id', $userId)->count();
    }
}
