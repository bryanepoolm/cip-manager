<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory para generar datos de prueba de Exportaciones
 * 
 * Los factories nos permiten crear datos falsos pero realistas
 * para pruebas y desarrollo. Es una buena práctica en Laravel.
 * 
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exportacion>
 */
class ExportacionFactory extends Factory
{
    /**
     * Lista de países comunes para exportaciones
     *
     * @var array<string>
     */
    private array $paises = [
        'México',
        'Estados Unidos',
        'Canadá',
        'España',
        'Alemania',
        'Francia',
        'China',
        'Japón',
        'Brasil',
        'Argentina',
    ];

    /**
     * Define el estado por defecto del modelo
     * 
     * Este método genera datos aleatorios pero realistas
     * para cada campo del modelo Exportacion.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Fecha aleatoria en los últimos 2 años
            'fecha' => $this->faker->dateTimeBetween('-2 years', 'now'),

            // Clave única con formato EXP-XXXXXX
            'clave' => 'EXP-' . strtoupper($this->faker->unique()->bothify('??????')),

            // País de origen aleatorio
            'origen' => $this->faker->randomElement($this->paises),

            // País de destino aleatorio (diferente al origen)
            'destino' => $this->faker->randomElement(
                array_diff($this->paises, [$this->faker->randomElement($this->paises)])
            ),
        ];
    }
}
