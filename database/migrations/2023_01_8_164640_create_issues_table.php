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
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->string("ticket_code")->nullable();
            $table->string("name");
            $table->text("description")->nullable();
            $table->string("requester_name")->nullable();
            $table->dateTimeTz("requested_at")->nullable();
            $table->dateTimeTz("start_on")->nullable();
            $table->dateTimeTz("due_on")->nullable();
            $table->dateTimeTz("started_at")->nullable();
            $table->boolean("completed")->default(false);
            $table->dateTimeTz("completed_at")->nullable();
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
        Schema::dropIfExists('issues');
    }
};
