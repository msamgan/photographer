<?php

namespace App\Console\Commands;

use App\Models\Client;
use Illuminate\Console\Command;

class AddFakeClients extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-fake-clients';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add fake clients to the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Adding fake clients to the database...');

        Client::factory()->count(100)->create();

        $this->info('All done!');
    }
}
