<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo Exportacion
 * 
 * Representa un registro de exportación internacional en el sistema.
 * 
 * @property int $id
 * @property string $fecha
 * @property string $clave
 * @property string $origen
 * @property string $destino
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Exportacion extends Model
{
    use HasFactory;
    /**
     * Nombre de la tabla en la base de datos
     * 
     * Por defecto Laravel buscaría 'exportacions' (pluralización en inglés),
     * así que especificamos el nombre correcto en español.
     *
     * @var string
     */
    protected $table = 'exportaciones';

    /**
     * Atributos que se pueden asignar masivamente
     * 
     * Esto permite hacer: Exportacion::create($request->all())
     * Solo estos campos pueden ser llenados de forma masiva por seguridad.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fecha',
        'clave',
        'origen',
        'destino',
        'descripcion_carga',
        'tipo_carga',
        'tipo_envio',
        'estado',
    ];

    /**
     * Atributos que deben ser convertidos a tipos nativos
     * 
     * Laravel automáticamente convertirá estos campos a los tipos especificados
     * cuando accedas a ellos desde el modelo.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'fecha' => 'date',  // Se convierte a Carbon (objeto de fecha)
    ];

    /**
     * Atributos que deben estar ocultos en arrays/JSON
     * 
     * Útil si en el futuro agregamos campos sensibles que no queremos exponer en APIs
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * Scope: Exportaciones recientes
     * 
     * Uso: Exportacion::recientes()->get()
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRecientes($query)
    {
        return $query->orderBy('id', 'desc');
    }

    /**
     * Scope: Filtrar por origen
     * 
     * Uso: Exportacion::porOrigen('México')->get()
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $origen
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePorOrigen($query, $origen)
    {
        return $query->where('origen', 'like', "%{$origen}%");
    }

    /**
     * Scope: Filtrar por destino
     * 
     * Uso: Exportacion::porDestino('Estados Unidos')->get()
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $destino
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePorDestino($query, $destino)
    {
        return $query->where('destino', 'like', "%{$destino}%");
    }

    /**
     * Get the documentos for the Exportacion.
     */
    public function documentos(): HasMany
    {
        return $this->hasMany(ExportacionDocumento::class);
    }

    /**
     * Get the bitacoras for the Exportacion.
     */
    public function bitacoras(): HasMany
    {
        return $this->hasMany(Bitacora::class)->orderBy('created_at', 'desc');
    }
}
