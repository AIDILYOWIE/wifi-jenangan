<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = 'pelanggan', $guarded = [],
        $hidden = ['id_paket'];
    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $latest = static::orderBy('id', 'desc')->first();
            $nextId = $latest ? $latest->id + 1 : 1;
            $model->kode_pelanggan = 'PL-' . str_pad($nextId, 3, "0", STR_PAD_LEFT);
        });
    }

    public function paket()
    {
        return $this->belongsTo(Paket::class, 'id_paket', 'id');
    }

    public function tagihan()
    {
        return $this->hasMany(Tagihan::class, 'id_pelanggan', 'id');
    }

    public function collector()
    {
        return $this->belongsTo(User::class, 'assign_to', 'id');
    }
}
