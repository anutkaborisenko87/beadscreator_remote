<?php

use Database\Seeders\LayoutSeeder;
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
        Schema::create('layouts_langs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('layouts_id')->constrained('layouts')->onDelete('cascade');
            $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
            $table->string('title');
            $table->timestamps();
        });
        (new Database\Seeders\DatabaseSeeder)->call(LayoutSeeder::class);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layouts_langs');
    }
};
