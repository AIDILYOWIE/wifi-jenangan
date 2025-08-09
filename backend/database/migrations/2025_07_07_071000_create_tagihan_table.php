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
        Schema::create('tagihan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pelanggan')->nullable()->constrained('pelanggan')->nullOnDelete()->onUpdate('cascade');
            $table->string('pelanggan_name');
            $table->string('pelanggan_kecamatan');
            $table->string('name');
            $table->date('tanggal');
            $table->integer('total_tagihan');
            $table->enum('status', ['Belum Lunas', 'Lunas']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan');
    }
};
