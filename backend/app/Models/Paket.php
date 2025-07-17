<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    use HasFactory;

    protected $table = "paket",
              $guarded = [];

    public function pelanggan() {
        return $this->hasMany(Pelanggan::class, 'id_paket', 'id');
    }
}
