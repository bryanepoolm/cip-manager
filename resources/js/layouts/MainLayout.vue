<script setup>
import { ref } from 'vue';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

/**
 * Layout principal de la aplicación
 * Proporciona estructura común para todas las páginas:
 * - Header con navegación
 * - Toast para notificaciones
 * - ConfirmDialog para confirmaciones
 * - Contenedor responsive
 */
const sidebarVisible = ref(false);

</script>
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Toast para notificaciones globales -->
        <Toast />
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex item-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900">
                        CIP Manager
                    </h1>
                    <nav class="flex gap-4">
                        <a href="/exportaciones"
                            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Registros
                        </a>
                    </nav>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <slot />
        </main>

    </div>
</template>
<style scoped>
/* 
 * Estilos mínimos, aprovechamos Tailwind CSS
 * PrimeVue maneja sus propios estilos internamente
 */
</style>