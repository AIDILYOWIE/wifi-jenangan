<?php

namespace Database\Seeders;

use App\Models\Paket;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // user
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@mail.com',
        ]);

        // paket
        Paket::insert([
            [
                'name' => 'Paket 1',
                'harga' => 100000,
                'created_at' => now()
            ],
            [
                'name' => 'Paket 2',
                'harga' => 150000,
                'created_at' => now()
            ],
            [
                'name' => 'Paket 3',
                'harga' => 200000,
                 'created_at' => now()
            ],
            [
                'name' => 'Paket 4',
                'harga' => 250000,
                'created_at' => now()
            ],
            [
                'name' => 'Paket 5',
                'harga' => 300000,
                'created_at' => now()
            ],
        ]);


    }
}
