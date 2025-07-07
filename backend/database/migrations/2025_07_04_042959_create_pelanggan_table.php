<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pelanggan', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pelanggan');
            $table->foreignId('id_paket')->constrained('paket')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('dusun');
            $table->string('desa');
            $table->string('kecamatan');
            $table->date('tanggal_pemasangan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggan');
    }
};
