<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description")->nullable();
            $table->double("progress")->default(0.0);
            $table->dateTimeTz("start_on")->nullable();
            $table->dateTimeTz("due_on")->nullable();
            $table->dateTimeTz("started_at")->nullable();
            $table->boolean("completed")->default(false);
            $table->dateTimeTz("completed_at")->nullable();
            $table->unsignedBigInteger('completed_by')->nullable();
            $table->foreign('completed_by')->references('id')->on('users');
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
