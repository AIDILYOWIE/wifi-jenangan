<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = 'pelanggan', $guarded = [];
    public $timestamps = false;

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $latest = static::orderBy('id', 'desc')->first();
            $nextId = $latest ? $latest->id + 1 : 1;
            $model->kode_pelanggan = 'PL-'. str_pad($nextId, 3, "0", STR_PAD_LEFT);
        });
    }

}
