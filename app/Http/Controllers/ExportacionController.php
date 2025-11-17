<?php

namespace App\Http\Controllers;

use App\Models\Exportacion;
use App\Models\ExportacionDocumento;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class ExportacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $exportaciones = Exportacion::recientes()->get();
        return Inertia::render('exportaciones/Index', [
            'exportaciones' => [
                'data' => $exportaciones
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('exportaciones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'fecha' => 'required|date',
                'origen' => 'required|string|max:100',
                'destino' => 'required|string|max:100',
                'documentos' => 'nullable|array', // Array de archivos
                'documentos.*' => 'file|mimes:pdf,jpg,png|max:2048', // Reglas para cada archivo
                'descripcion_carga' => 'nullable|string',
                'tipo_carga' => 'nullable|in:contenedor,granel,paquetería,otro',
                'tipo_envio' => 'nullable|in:aéreo,marítimo,tren,carretera,multimodal',
                'estado' => 'nullable|in:pendiente,en_proceso,completada,cancelada',
            ],
            [
                // Mensajes personalizados en español
                'fecha.required' => 'La fecha es obligatoria',
                'fecha.date' => 'La fecha debe ser válida',
                'origen.required' => 'El origen es obligatorio',
                'destino.required' => 'El destino es obligatorio',
                'documentos.*.file' => 'Cada elemento debe ser un archivo.',
                'documentos.*.mimes' => 'Solo se permiten archivos PDF, JPG y PNG.',
                'documentos.*.max' => 'El tamaño máximo permitido para cada archivo es de 2MB.',
                'descripcion_carga.string' => 'La descripción de la carga debe ser una cadena.',
                'tipo_carga.in' => 'El tipo de carga seleccionado no es válido.',
                'tipo_envio.in' => 'El tipo de envío seleccionado no es válido.',
                'estado.in' => 'El estado seleccionado no es válido.',
            ]
        );
        // Generar una clave única
        do {
            $clave = 'CIP-' . strtoupper(Str::random(8));
        } while (Exportacion::where('clave', $clave)->exists());


        // Iniciar una transacción de base de datos
        return DB::transaction(function () use ($validated, $request, $clave) {
            // Crear la exportación principal
            $exportacion = Exportacion::create([
                'fecha' => $validated['fecha'],
                'clave' => $clave,
                'origen' => $validated['origen'],
                'destino' => $validated['destino'],
                'descripcion_carga' => $validated['descripcion_carga'],
                'tipo_carga' => $validated['tipo_carga'],
                'tipo_envio' => $validated['tipo_envio'],
                'estado' => $validated['estado'],
            ]);

            // Manejar la subida de documentos si existen
            if ($request->hasFile('documentos')) {
                foreach ($request->file('documentos') as $documento) {
                    $path = $this->storeUniqueFile($documento, 'exportaciones_docs');
                    $exportacion->documentos()->create(['path' => $path]);
                }
            }

            return redirect()->route('exportaciones.index')
                ->with('success', 'Exportación creada exitosamente.');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Exportacion $exportacion): Response
    {
        return Inertia::render('exportaciones/Show', [
            'exportacion' => $exportacion,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $exportacion = Exportacion::with(['documentos', 'bitacoras.user'])->findOrFail($id);
        return Inertia::render('exportaciones/Edit', [
            'exportacion' => $exportacion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $exportacion = Exportacion::findOrFail($id);
        $validated = $request->validate([
            'fecha' => 'required|date',
            'clave' => "required|string|max:50|unique:exportaciones,clave,{$exportacion->id}",
            'origen' => 'required|string|max:100',
            'destino' => 'required|string|max:100',
            'nuevos_documentos' => 'nullable|array',
            'nuevos_documentos.*' => 'file|mimes:pdf,jpg,png|max:2048',
            'documentos_a_eliminar' => 'nullable|array',
            'documentos_a_eliminar.*' => 'integer|exists:exportacion_documentos,id',
            'descripcion_carga' => 'nullable|string',
            'tipo_carga' => 'nullable|in:contenedor,granel,paquetería,otro',
            'tipo_envio' => 'nullable|in:aéreo,marítimo,tren,carretera,multimodal',
            'estado' => 'nullable|in:pendiente,en_proceso,completada,cancelada',
            'bitacora_nota' => 'nullable|string|max:1000',
        ]);

        return DB::transaction(function () use ($validated, $request, $exportacion) {
            $estadoOriginal = $exportacion->estado;
            
            // 1. Actualizar los campos principales
            $exportacion->update($validated);

            // 2. Si el estado ha cambiado, crear una entrada en la bitácora
            if ($estadoOriginal !== $validated['estado']) {
                $exportacion->bitacoras()->create([
                    'estado_anterior' => $estadoOriginal,
                    'estado_nuevo' => $validated['estado'],
                    'nota' => $validated['bitacora_nota'] ?? 'Sin notas.',
                    'user_id' => Auth::id(),
                ]);
            }

            // 3. Eliminar los documentos marcados
            if (!empty($validated['documentos_a_eliminar'])) {
                $documentosParaBorrar = ExportacionDocumento::whereIn('id', $validated['documentos_a_eliminar'])->get();
                foreach ($documentosParaBorrar as $doc) {
                    Storage::disk('public')->delete($doc->path);
                    $doc->delete();
                }
            }

            // 4. Añadir los nuevos documentos
            if ($request->hasFile('nuevos_documentos')) {
                foreach ($request->file('nuevos_documentos') as $documento) {
                    $path = $this->storeUniqueFile($documento, 'exportaciones_docs');
                    $exportacion->documentos()->create(['path' => $path]);
                }
            }

            return redirect()->route('exportaciones.index')
                ->with('success', 'Exportación actualizada exitosamente.');
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $exportacion = Exportacion::findOrFail($id);

        if ($exportacion->delete()) {
            return redirect()->route('exportaciones.index')
                ->with('success', 'Exportación eliminada exitosamente.');
        }

        return back()->with('error', 'No se pudo eliminar la exportación.');
    }

    /**
     * Stores a file with a sanitized, unique name.
     */
    private function storeUniqueFile(UploadedFile $file, string $directory): string
    {
        $sanitizedFilename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $extension = $file->getClientOriginalExtension();
        $path = "{$directory}/{$sanitizedFilename}.{$extension}";
        $counter = 1;

        while (Storage::disk('public')->exists($path)) {
            $counter++;
            $path = "{$directory}/{$sanitizedFilename}_{$counter}.{$extension}";
        }

        $file->storeAs(dirname($path), basename($path), 'public');

        return $path;
    }
}