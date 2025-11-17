<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExportacionDocumento extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'exportacion_documentos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'exportacion_id',
        'path',
    ];

    /**
     * Get the exportacion that owns the ExportacionDocumento.
     */
    public function exportacion(): BelongsTo
    {
        return $this->belongsTo(Exportacion::class);
    }
}