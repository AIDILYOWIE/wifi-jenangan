<?php

namespace Database\Seeders;

use App\Models\Paket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
