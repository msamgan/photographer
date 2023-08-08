<?php

namespace Database\Factories;

use App\Models\client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<client>
 */
class clientFactory extends Factory
{
    protected $model = client::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'user_id' => 1,
            'name' => fake()->name(),
            'spouse_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'full_address' => fake()->address(),
        ];
    }
}
