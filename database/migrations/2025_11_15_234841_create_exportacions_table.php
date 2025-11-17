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
        Schema::create('exportaciones', function (Blueprint $table) {
            $table->id();
            // Fecha de la exportación
            $table->date('fecha')
                ->comment('Fecha en que se realizó la exportación');
            // Clave única de identificación
            $table->string('clave', 50)
                ->unique()
                ->comment('Código único de identificación de la exportación');

            $table->enum('tipo_envio', ['aéreo', 'marítimo', 'tren', 'carretera', 'multimodal'])
                ->default('marítimo')
                ->comment('Tipo de envío utilizado para la exportación');

            // País/Ciudad de origen
            $table->string('origen', 100)
                ->comment('País o ciudad de origen de la exportación');
            // País/Ciudad de destino
            $table->string('destino', 100)
                ->comment('País o ciudad de destino de la exportación');

            $table->enum('tipo_carga', ['contenedor', 'granel', 'paquetería', 'otro'])
                ->default('paquetería')
                ->comment('Tipo de carga exportada');

            $table->longText('descripcion_carga')->nullable()->comment('Descripción de la carga exportada');

            $table->enum('estado', ['pendiente', 'en_proceso', 'completada', 'cancelada'])
                ->default('pendiente')
                ->comment('Estado actual de la exportación');

            // Timestamps automáticos (created_at, updated_at)
            $table->timestamps();
            // Índices para mejorar el rendimiento de búsquedas
            $table->index('fecha');
            $table->index('clave');
            $table->index(['origen', 'destino']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exportaciones');
    }
};
