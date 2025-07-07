<?php

namespace Database\Seeders;

use App\Models\Paket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'a',
            'email' => 'a@a.a',
        ]);

        for ($i=1; $i <= 3; $i++) { 
            Paket::create([
                'name' => 'Paket ' . $i *10 . ' mbps',
                'harga' => $i * 100000
            ]);
        }
    }
}
