<script setup>
import { ref, watch, nextTick } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { router, Head, usePage } from '@inertiajs/vue3';
import exportacionRoutes from '@/routes/exportaciones';
import AppLayout from '@/layouts/AppLayout.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ConfirmDialog from 'primevue/confirmdialog';

/**
 * Vista principal para el listado de exportaciones
 * 
 * Funcionalidades:
 * - Listado con DataTable de PrimeVue
 * - Búsqueda global en todos los campos
 * - Acciones: Ver, Editar, Eliminar
 * - Paginación
 * - Ordenamiento por columnas
 */

// Breadcrumbs para la navegación
const breadcrumbs = [
    {
        title: 'Exportaciones',
        href: exportacionRoutes.index().url,
    },
];

const props = defineProps({
    exportaciones: {
        type: Object,
        required: true,
        default: () => ({ data: [] }),
    }
});

// Composables de PrimeVue
const toast = useToast();
const confirm = useConfirm();
const page = usePage();

// Watcher para los mensajes flash
watch(() => page.props.flash?.success, (successMessage) => {
    if (successMessage) {
        nextTick(() => {
            toast.add({ severity: 'success', summary: 'Éxito', detail: successMessage, life: 3000 });
        });
    }
}, { immediate: true });

watch(() => page.props.flash?.error, (errorMessage) => {
    if (errorMessage) {
        nextTick(() => {
            toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        });
    }
}, { immediate: true });


const filters = ref({
    global: { value: null, matchMode: 'contains' },

});

const crear = () => {
    router.visit('/exportaciones/create');
};
const editar = (id) => {
    router.visit(`/exportaciones/${id}/edit`);
};

const eliminar = (id) => {
    confirm.require({
        message: 'Estas seguro de eliminar esta exportación?',
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            router.delete(`/exportaciones/${id}`, {
                preserveScroll: true,
                preserveState: false, // Forzar refresco de la página y datos
                onError: () => {
                    toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error de comunicación con el servidor.', life: 3000 });
                }
            });
        }
    });
};
const formatearFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>
<template>
    <Head title="Exportaciones" />
    
    <AppLayout :breadcrumbs="breadcrumbs">
        
        <!-- Dialog de confirmación -->
        <ConfirmDialog />

        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Exportaciones</h2>
                <p class="mt-1 text-sm text-gray-600">
                    Gestiona los registros de exportaciones internacionales
                </p>
            </div>
            <Button label="Nueva Exportación" icon="pi pi-plus" @click="crear" severity="success" />
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <DataTable :value="exportaciones.data" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 25, 50]"
                v-model:filters="filters" filterDisplay="row" :globalFilterFields="['clave', 'origen', 'destino']"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
                responsiveLayout="scroll" stripedRows class="p-datatable-sm">
                <!-- Header con búsqueda global -->
                <template #header>
                    <div class="flex justify-between items-center p-4">
                        <span class="text-lg font-semibold text-gray-700">
                            Listado de Exportaciones
                        </span>
                        <IconField iconPosition="left" class="w-full max-w-xs">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters.global.value" placeholder="Buscar..." class="w-full" />
                        </IconField>
                    </div>
                </template>

                <!-- Columnas de la tabla -->
                <!-- <Column field="id" header="ID" sortable style="min-width: 80px">
                    <template #body="slotProps">
                        <span class="font-mono text-sm">
                            #{{ slotProps.data.id }}
                        </span>
                    </template>
                </Column> -->
                
                <Column field="clave" header="Clave" sortable style="min-width: 150px">
                    <template #body="slotProps">
                        <span class="font-semibold text-blue-600">
                            {{ slotProps.data.clave }}
                        </span>
                    </template>
                </Column>

                <Column field="fecha" header="Fecha" sortable style="min-width: 150px">
                    <template #body="slotProps">
                        <span class="text-gray-700">
                            {{ formatearFecha(slotProps.data.fecha) }}
                        </span>
                    </template>
                </Column>


                <Column field="origen" header="Origen" sortable style="min-width: 150px"></Column>

                <Column field="destino" header="Destino" sortable style="min-width: 150px"></Column>

                <Column header="Acciones" :exportable="false" style="min-width: 200px">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <Button icon="pi pi-pencil" outlined rounded severity="info"
                                @click="editar(slotProps.data.id)" v-tooltip.top="'Editar'" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="eliminar(slotProps.data.id)" v-tooltip.top="'Eliminar'" />
                        </div>
                    </template>
                </Column>
                <!-- Mensaje cuando no hay datos -->
                <template #empty>
                    <div class="text-center py-8">
                        <i class="pi pi-inbox text-4xl text-gray-400 mb-3"></i>
                        <p class="text-gray-500">No se encontraron exportaciones</p>
                    </div>
                </template>
            </DataTable>
        </div>
    </AppLayout>
</template>

<style scoped>
/**
 * Los estilos están manejados por:
 * - PrimeVue (tema Aura)
 * - Tailwind CSS (utilidades)
 * 
 * Solo agregamos estilos específicos si es necesario
 */
</style>