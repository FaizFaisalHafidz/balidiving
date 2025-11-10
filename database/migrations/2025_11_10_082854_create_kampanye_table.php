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
        Schema::create('kampanye', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('kategori_id')->constrained('kategori_kampanye')->onDelete('restrict');
            $table->string('judul', 200);
            $table->string('slug', 220)->unique();
            $table->text('deskripsi');
            $table->decimal('target_dana', 15, 2);
            $table->decimal('dana_terkumpul', 15, 2)->default(0);
            $table->date('tanggal_mulai');
            $table->date('tanggal_berakhir');
            $table->string('gambar_utama');
            $table->enum('status', ['draft', 'aktif', 'selesai', 'ditolak'])->default('draft');
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index('tanggal_berakhir');
            $table->index(['kategori_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kampanye');
    }
};
