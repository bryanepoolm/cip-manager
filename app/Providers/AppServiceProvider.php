<?php

namespace App\Providers;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // DB::listen(function ($query) {
        //     // Puedes registrar las consultas SQL para depuración si es necesario
        //     // logger($query->sql, $query->bindings, $query->time);
        //     info($query->sql, $query->bindings);
        // });
    }
}
