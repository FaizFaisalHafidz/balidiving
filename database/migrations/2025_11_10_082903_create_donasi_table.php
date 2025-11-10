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
        Schema::create('donasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('kampanye_id')->constrained('kampanye')->onDelete('cascade');
            $table->decimal('jumlah', 15, 2);
            $table->enum('metode_pembayaran', ['transfer_bank', 'ewallet']);
            $table->string('id_transaksi', 100)->unique();
            $table->enum('status', ['pending', 'berhasil', 'gagal'])->default('pending');
            $table->string('nama_donatur', 100)->nullable();
            $table->string('email_donatur', 100)->nullable();
            $table->text('pesan_dukungan')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index(['kampanye_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donasi');
    }
};
