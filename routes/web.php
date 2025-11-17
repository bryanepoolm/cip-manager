<?php

use App\Http\Controllers\ExportacionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

/**
 * Rutas de la aplicación
 */

// Ruta Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Ruta principal redirige al dashboard
Route::get('/', function () {
    return redirect()->route('dashboard');
});

/**
 * Rutas para el CRUD de Exportaciones
 * 
 * El método resource() crea automáticamente todas las rutas RESTful:
 * 
 * GET    /exportaciones              -> index   (listar)
 * GET    /exportaciones/create       -> create  (formulario crear)
 * POST   /exportaciones              -> store   (guardar nuevo)
 * GET    /exportaciones/{id}         -> show    (ver uno)
 * GET    /exportaciones/{id}/edit    -> edit    (formulario editar)
 * PUT    /exportaciones/{id}         -> update  (actualizar)
 * DELETE /exportaciones/{id}         -> destroy (eliminar)
 */
Route::resource('exportaciones', ExportacionController::class)
    ->middleware(['auth', 'verified']);

require __DIR__ . '/settings.php';
