<script setup>
import { ref, watch, nextTick } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useCountries } from '@/composables/useCountries.ts';

/**
 * Vista para editar un registro de exportación.
 */

const props = defineProps({
    exportacion: {
        type: Object,
        required: true,
    },
});

const toast = useToast();
const { countries, isLoading: isLoadingCountries } = useCountries();

// --- STATE MANAGEMENT ---
const breadcrumbs = [
    { title: 'Exportaciones', href: '/exportaciones' },
    { title: 'Editar', href: `/exportaciones/${props.exportacion.id}/edit` },
];
const existingDocuments = ref([...props.exportacion.documentos]);
const form = useForm({
    _method: 'PUT',
    fecha: new Date(props.exportacion.fecha),
    clave: props.exportacion.clave,
    origen: props.exportacion.origen,
    destino: props.exportacion.destino,
    descripcion_carga: props.exportacion.descripcion_carga,
    tipo_carga: props.exportacion.tipo_carga,
    tipo_envio: props.exportacion.tipo_envio,
    estado: props.exportacion.estado,
    bitacora_nota: '',
    nuevos_documentos: [],
    documentos_a_eliminar: [],
});

// --- BITÁCORA MODAL LOGIC ---
const showNotaModal = ref(false);
const estadoAnterior = ref(null);
const isCancelling = ref(false);

watch(() => form.estado, (nuevoEstado, viejoEstado) => {
    if (isCancelling.value) return;

    if (nuevoEstado !== viejoEstado && viejoEstado !== null) { // Evitar que se dispare en la carga inicial
        estadoAnterior.value = viejoEstado;
        showNotaModal.value = true;
    }
});

function handleGuardarNota() {
    showNotaModal.value = false;
    // La nota ya está en form.bitacora_nota, no se necesita más acción aquí.
}

function handleCancelarNota() {
    isCancelling.value = true;
    form.estado = estadoAnterior.value; // Revertir el cambio
    form.bitacora_nota = '';
    showNotaModal.value = false;
    nextTick(() => {
        isCancelling.value = false;
    });
}


// --- FILE HANDLING ---
const onFileSelect = (event) => { form.nuevos_documentos = event.files; };
const onFileRemove = (event) => {
    const index = form.nuevos_documentos.findIndex(file => file.name === event.file.name && file.size === event.file.size);
    if (index !== -1) form.nuevos_documentos.splice(index, 1);
};
const onFileClear = () => { form.nuevos_documentos = []; };
const markForDeletion = (documentoId) => {
    if (!form.documentos_a_eliminar.includes(documentoId)) {
        form.documentos_a_eliminar.push(documentoId);
    }
    existingDocuments.value = existingDocuments.value.filter(doc => doc.id !== documentoId);
};

// --- FORM SUBMISSION ---
const submit = () => {
    if (form.estado !== props.exportacion.estado && !form.bitacora_nota) {
        toast.add({ severity: 'warn', summary: 'Nota Requerida', detail: 'Debes agregar una nota para el cambio de estado.', life: 3000 });
        showNotaModal.value = true;
        return;
    }
    form.post(`/exportaciones/${props.exportacion.id}`, {
        forceFormData: true,
        onSuccess: () => {},
        onError: (errors) => {
            toast.add({ severity: 'error', summary: 'Error de Validación', detail: 'Por favor, revisa los campos del formulario.', life: 3000 });
        }
    });
};
</script>

<template>
    <Head title="Editar Exportación" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <Toast />
        <div class="max-w-2xl mx-auto">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900">
                    Editar Exportación {{ exportacion.clave }}
                </h2>
                <p class="mt-1 text-sm text-gray-600">
                    Modifica los datos del registro y gestiona los documentos adjuntos.
                </p>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <form @submit.prevent="submit">
                    <div class="grid grid-cols-1 gap-6">
                        <!-- Campos del formulario -->
                        <div>
                            <InputLabel for="fecha" value="Fecha de Exportación" />
                            <Calendar id="fecha" v-model="form.fecha" dateFormat="dd/mm/yy" class="" :invalid="!!form.errors.fecha" />
                            <InputError class="mt-2" :message="form.errors.fecha" />
                        </div>
                        <div>
                            <InputLabel for="clave" value="Clave de Exportación" />
                            <InputText id="clave" v-model="form.clave" type="text" class="w-full" :invalid="!!form.errors.clave" disabled />
                            <InputError class="mt-2" :message="form.errors.clave" />
                        </div>

                        <!-- Campo tipo de envio -->
                        <div>
                            <InputLabel for="tipo_envio" value="Tipo de Envío" />
                            <div class="flex flex-wrap gap-4 mt-2">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="aéreo" name="tipo_envio" value="aéreo" />
                                    <label for="aéreo">Aéreo</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="marítimo" name="tipo_envio" value="marítimo" />
                                    <label for="marítimo">Marítimo</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="tren" name="tipo_envio" value="tren" />
                                    <label for="tren">Tren</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="carretera" name="tipo_envio" value="carretera" />
                                    <label for="carretera">Carretera</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="multimodal" name="tipo_envio" value="multimodal" />
                                    <label for="multimodal">Multimodal</label>
                                </div>
                            </div>
                        </div>
                        <!-- Campo tipo de carga -->
                        <div>
                            <InputLabel for="tipo_carga" value="Tipo de Carga" />
                            <div class="flex flex-wrap gap-4 mt-2">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="contenedor" name="tipo_carga" value="contenedor" />
                                    <label for="contenedor">Contenedor</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="granel" name="tipo_carga" value="granel" />
                                    <label for="granel">Granel</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="paquetería" name="tipo_carga" value="paquetería" />
                                    <label for="paquetería">Paquetería</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="otro" name="tipo_carga" value="otro" />
                                    <label for="otro">Otro</label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <InputLabel for="origen" value="País de Origen" />
                            <Dropdown 
                                id="origen"
                                v-model="form.origen" 
                                :options="countries" 
                                optionLabel="label" 
                                optionValue="value"
                                placeholder="Selecciona un país" 
                                class="w-full"
                                :loading="isLoadingCountries"
                                :invalid="!!form.errors.origen"
                                filter
                            />
                            <InputError class="mt-2" :message="form.errors.origen" />
                        </div>
                        <div>
                            <InputLabel for="destino" value="País de Destino" />
                            <Dropdown 
                                id="destino"
                                v-model="form.destino" 
                                :options="countries" 
                                optionLabel="label" 
                                optionValue="value"
                                placeholder="Selecciona un país" 
                                class="w-full"
                                :loading="isLoadingCountries"
                                :invalid="!!form.errors.destino"
                                filter
                            />
                            <InputError class="mt-2" :message="form.errors.destino" />
                        </div>

                        <!-- Campo Descripción-->
                        <div>
                            <InputLabel for="descripcion_carga" value="Descripción" />
                            <Textarea id="descripcion_carga" v-model="form.descripcion_carga" class="w-full" rows="4"
                                placeholder="Agrega una descripción de la carga (opcional)"
                                :invalid="!!form.errors.descripcion_carga" />
                            <InputError class="mt-2" :message="form.errors.descripcion_carga" />
                        </div>

                        <!-- Estatus de carga -->
                         <div>
                            <InputLabel for="estado" value="Estado de la Carga" />
                            <Select
                                id="estado"
                                v-model="form.estado"
                                placeholder="Seleccionar estado"
                                :options="[
                                    { label: 'Pendiente', value: 'pendiente'},
                                    { label: 'En proceso', value: 'en_proceso' },
                                    { label: 'Completada', value: 'completada' },
                                    { label: 'Cancelada', value: 'cancelada' },
                                ]"
                                optionLabel="label"
                                optionValue="value"
                                class="w-full"
                                :invalid="!!form.errors.estado"
                            />
                            <InputError class="mt-2" :message="form.errors.estado" />
                         </div>

                        <!-- Documentos Actuales -->
                        <div v-if="existingDocuments.length > 0">
                            <InputLabel value="Documentos Actuales" class="mb-2" />
                            <div class="border rounded-md p-2 space-y-2">
                                <div v-for="doc in existingDocuments" :key="doc.id" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                                    <div class="flex items-center gap-2">
                                        <a :href="`/storage/${doc.path}`" target="_blank" class="flex items-center gap-2 text-blue-600 hover:underline">
                                            <i class="pi pi-file-pdf text-xl text-red-500"></i>
                                            <span>{{ doc.path.split('/').pop() }}</span>
                                        </a>
                                        <a :href="`/storage/${doc.path}`" target="_blank" download v-tooltip.top="'Descargar archivo'">
                                            <Button icon="pi pi-download" text rounded severity="secondary" />
                                        </a>
                                        <Button icon="pi pi-trash" text rounded severity="danger" @click="markForDeletion(doc.id)" v-tooltip.top="'Marcar para eliminar'" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Añadir Nuevos Documentos -->
                        <div>
                            <InputLabel value="Añadir Nuevos Documentos" class="mb-2" />
                            <FileUpload 
                                name="nuevos_documentos[]" 
                                :multiple="true" 
                                accept="application/pdf,image/*" 
                                :maxFileSize="2000000"
                                :customUpload="true" 
                                @select="onFileSelect"
                                @remove="onFileRemove"
                                @clear="onFileClear"
                                invalidFileSizeMessage="El tamaño máximo permitido para cada archivo es de 2MB."
                                invalidFileTypeMessage="Solo se permiten archivos PDF, JPG y PNG."
                            >
                                <template #empty>
                                    <p>Arrastra y suelta archivos aquí para subirlos.</p>
                                </template>
                            </FileUpload>
                            <InputError class="mt-2" :message="form.errors.nuevos_documentos" />
                        </div>
                    </div>

                    <!-- Acciones del formulario -->
                    <div class="flex items-center justify-end mt-8">
                        <Button type="submit" label="Actualizar Exportación" :loading="form.processing" icon="pi pi-check" severity="success" />
                    </div>
                </form>
            </div>

            <!-- Timeline de Bitácora -->
            <div v-if="exportacion.bitacoras && exportacion.bitacoras.length > 0" class="mt-12">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Historial de Cambios</h3>
                <Timeline :value="exportacion.bitacoras" align="alternate" class="customized-timeline">
                    <template #marker="slotProps">
                        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :class="{ 'bg-green-500': slotProps.item.estado_nuevo === 'completada', 'bg-blue-500': slotProps.item.estado_nuevo === 'en_proceso', 'bg-yellow-500': slotProps.item.estado_nuevo === 'pendiente', 'bg-red-500': slotProps.item.estado_nuevo === 'cancelada' }">
                            <i class="pi pi-check" v-if="slotProps.item.estado_nuevo === 'completada'"></i>
                            <i class="pi pi-spin pi-spinner" v-else-if="slotProps.item.estado_nuevo === 'en_proceso'"></i>
                            <i class="pi pi-history" v-else-if="slotProps.item.estado_nuevo === 'pendiente'"></i>
                            <i class="pi pi-times" v-else-if="slotProps.item.estado_nuevo === 'cancelada'"></i>
                        </span>
                    </template>
                    <template #content="slotProps">
                        <Card class="mt-0 mb-5">
                            <template #title>
                                <span class="capitalize">{{ slotProps.item.estado_nuevo.replace('_', ' ') }}</span>
                            </template>
                            <template #subtitle>
                                {{ new Date(slotProps.item.created_at).toLocaleString() }} por {{ slotProps.item.user.name }}
                            </template>
                            <template #content>
                                <p>{{ slotProps.item.nota }}</p>
                            </template>
                        </Card>
                    </template>
                </Timeline>
            </div>
        </div>

        <!-- Modal para Nota de Bitácora -->
        <Dialog v-model:visible="showNotaModal" modal header="Cambio de Estado" :style="{ width: '25rem' }">
            <div class="flex flex-col gap-4">
                <p>
                    Has cambiado el estado de <span class="font-semibold capitalize">{{ estadoAnterior?.replace('_', ' ') }}</span> a <span class="font-semibold capitalize">{{ form.estado?.replace('_', ' ') }}</span>.
                    Por favor, agrega una nota para registrar este cambio en la bitácora.
                </p>
                <Textarea v-model="form.bitacora_nota" rows="5" cols="30" placeholder="Escribe tu nota aquí..." class="w-full" />
            </div>
            <template #footer>
                <Button label="Cancelar" severity="secondary" @click="handleCancelarNota" />
                <Button label="Guardar Nota" severity="success" @click="handleGuardarNota" :disabled="!form.bitacora_nota" />
            </template>
        </Dialog>

    </AppLayout>
</template>
<style>
.p-timeline-event-opposite {
    display: none;
}
</style>