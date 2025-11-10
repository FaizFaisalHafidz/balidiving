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
        Schema::create('penarikan_dana', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('kampanye_id')->constrained('kampanye')->onDelete('cascade');
            $table->decimal('jumlah_diminta', 15, 2);
            $table->string('nama_bank', 50);
            $table->string('nomor_rekening', 30);
            $table->string('nama_pemilik_rekening', 100);
            $table->enum('status', ['pending', 'disetujui', 'selesai', 'ditolak'])->default('pending');
            $table->text('catatan')->nullable();
            $table->timestamps();
            
            // Index
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penarikan_dana');
    }
};
