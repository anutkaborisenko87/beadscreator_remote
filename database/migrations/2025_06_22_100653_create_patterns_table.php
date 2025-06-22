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
        Schema::create('patterns', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->boolean('published')->default(false);
            $table->boolean('shared')->default(false);
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('preview_image')->nullable();
            $table->json('pattern_data')->nullable();
            $table->timestamps();
        });
        Schema::create('pattern_categories_patterns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pattern_id')->constrained('patterns')->onDelete('cascade');
            $table->foreignId('pattern_category_id')->constrained('pattern_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pattern_categories_patterns');
        Schema::dropIfExists('patterns');
    }
};
