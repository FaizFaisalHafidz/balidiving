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
        Schema::table('donasi', function (Blueprint $table) {
            $table->string('order_id')->unique()->nullable()->after('kampanye_id');
            $table->string('snap_token')->nullable()->after('order_id');
            $table->string('no_telepon_donatur')->nullable()->after('email_donatur');
            $table->text('pesan')->nullable()->after('no_telepon_donatur');
            $table->boolean('is_anonim')->default(false)->after('pesan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('donasi', function (Blueprint $table) {
            $table->dropColumn(['order_id', 'snap_token', 'no_telepon_donatur', 'pesan', 'is_anonim']);
        });
    }
};
