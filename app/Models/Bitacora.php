<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bitacora extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'exportacion_id',
        'user_id',
        'estado_anterior',
        'estado_nuevo',
        'nota',
    ];

    /**
     * Get the exportacion that owns the bitacora.
     */
    public function exportacion(): BelongsTo
    {
        return $this->belongsTo(Exportacion::class);
    }

    /**
     * Get the user that created the bitacora entry.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}