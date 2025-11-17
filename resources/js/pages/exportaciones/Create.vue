<script setup>
import { ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
import Select from 'primevue/select';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast'; // Importar Toast para mensajes de FileUpload
import { useToast } from 'primevue/usetoast'; // Importar useToast para mensajes de FileUpload
import { useCountries } from '@/composables/useCountries.ts';

/**
 * Vista para crear un nuevo registro de exportación.
 */

// Composables
const toast = useToast();
const { countries, isLoading: isLoadingCountries } = useCountries();

// Breadcrumbs
const breadcrumbs = [
    {
        title: 'Exportaciones',
        href: '/exportaciones',
    },
    {
        title: 'Crear',
        href: '/exportaciones/create',
    },
];

// Definición del formulario
const form = useForm({
    fecha: '',
    origen: null,
    destino: null,
    tipo_envio: null,
    tipo_carga: null,
    estado: null,
    descripcion_carga: null,
    documentos: [], // Para almacenar los archivos seleccionados
});

// --- MANEJO DE ARCHIVOS ---
const onFileSelect = (event) => {
    form.documentos = event.files;
};
const onFileRemove = (event) => {
    const index = form.documentos.findIndex(file => file.name === event.file.name && file.size === event.file.size);
    if (index !== -1) {
        form.documentos.splice(index, 1);
    }
};
const onFileClear = () => {
    form.documentos = [];
};

// --- SUBMISIÓN ---
const submit = () => {
    form.post('/exportaciones', {
        forceFormData: true,
    });
};
</script>

<template>

    <Head title="Crear Exportación" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <Toast />

        <div class="max-w-2xl mx-auto">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900">
                    Nueva Exportación
                </h2>
                <p class="mt-1 text-sm text-gray-600">
                    Completa los datos para registrar una nueva exportación y adjunta los documentos necesarios.
                </p>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <form @submit.prevent="submit">
                    <div class="grid grid-cols-1 gap-6">
                        <!-- Campo Fecha -->
                        <div>
                            <InputLabel for="fecha" value="Fecha de Exportación" />
                            <Calendar id="fecha" v-model="form.fecha" dateFormat="dd/mm/yy" class=""
                                :invalid="!!form.errors.fecha" />
                            <InputError class="mt-2" :message="form.errors.fecha" />
                        </div>

                        <!-- Campo Clave -->
                        <div>
                            <InputLabel for="clave" value="Clave de Exportación" />
                            <InputText id="clave" type="text" class="w-full" placeholder="Se generará automáticamente"
                                disabled />
                        </div>

                        <!-- Campo tipo de envio -->
                        <div>
                            <InputLabel for="tipo_envio" value="Tipo de Envío" />
                            <div class="flex flex-wrap gap-4">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="aéreo" name="tipo_envio"
                                        value="aéreo" />
                                    <label for="aéreo">Aéreo</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="marítimo" name="tipo_envio"
                                        value="marítimo" />
                                    <label for="marítimo">Marítimo</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="tren" name="tipo_envio"
                                        value="tren" />
                                    <label for="tren">Tren</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="carretera" name="tipo_envio"
                                        value="carretera" />
                                    <label for="carretera">Carretera</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_envio" inputId="multimodal" name="tipo_envio"
                                        value="multimodal" />
                                    <label for="multimodal">Multimodal</label>
                                </div>
                            </div>
                        </div>
                        <!-- Campo tipo de carga -->
                        <div>
                            <InputLabel for="tipo_carga" value="Tipo de Carga" />
                            <div class="flex flex-wrap gap-4">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="contenedor" name="tipo_carga"
                                        value="contenedor" />
                                    <label for="contenedor">Contenedor</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="granel" name="tipo_carga"
                                        value="granel" />
                                    <label for="ingredient2">Granel</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="paquetería" name="tipo_carga"
                                        value="paquetería" />
                                    <label for="ingredient3">Paquetería</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="form.tipo_carga" inputId="otro" name="tipo_carga"
                                        value="otro" />
                                    <label for="otro">Otro</label>
                                </div>
                            </div>
                        </div>

                        <!-- Campo Origen -->
                        <div>
                            <InputLabel for="origen" value="País de Origen" />
                            <Dropdown id="origen" v-model="form.origen" :options="countries" optionLabel="label"
                                optionValue="value" placeholder="Selecciona un país" class="w-full"
                                :loading="isLoadingCountries" :invalid="!!form.errors.origen" filter />
                            <InputError class="mt-2" :message="form.errors.origen" />
                        </div>

                        <!-- Campo Destino -->
                        <div>
                            <InputLabel for="destino" value="País de Destino" />
                            <Dropdown id="destino" v-model="form.destino" :options="countries" optionLabel="label"
                                optionValue="value" placeholder="Selecciona un país" class="w-full"
                                :loading="isLoadingCountries" :invalid="!!form.errors.destino" filter />
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
                            <InputLabel for="estado" value="Estatus de la Carga" />
                            <Select
                                id="estado"
                                v-model="form.estado"
                                placeholder="Seleccionar estatus"
                                :options="[
                                    { label: 'Pendiente', value: 'pendiente'},
                                    { label: 'En proceso', value: 'en_proceso' },
                                    { label: 'Completada', value: 'completada' },
                                    { label: 'Cancelada', value: 'cancelada' },
                                ]"
                                optionLabel="label"
                                optionValue="value"
                                defaultValue="pendiente"
                                class="w-full"
                                :invalid="!!form.errors.estado"
                            />
                            <InputError class="mt-2" :message="form.errors.estado" />
                         </div>

                        <!-- Campo Documentos -->
                        <div>
                            <InputLabel value="Documentos Adjuntos" class="mb-2" />
                            <FileUpload name="documentos[]" :multiple="true" accept="application/pdf,image/*"
                                :maxFileSize="2000000" :customUpload="true" @select="onFileSelect"
                                @remove="onFileRemove" @clear="onFileClear" :fileLimit="5"
                                invalidFileSizeMessage="El tamaño máximo permitido para cada archivo es de 2MB."
                                invalidFileTypeMessage="Solo se permiten archivos PDF, JPG y PNG.">
                                <template #empty>
                                    <p>Arrastra y suelta archivos aquí para subirlos.</p>
                                </template>
                            </FileUpload>
                            <InputError class="mt-2" :message="form.errors.documentos" />
                            <InputError class="mt-2" :message="form.errors['documentos.0']" />
                            <template v-if="form.errors.documentos && form.errors.documentos.length > 0">
                                <InputError v-for="(error, index) in form.errors.documentos" :key="index" class="mt-2"
                                    :message="error" />
                            </template>
                        </div>
                    </div>

                    <div class="flex items-center justify-end mt-8">
                        <Button type="submit" label="Guardar Exportación" :loading="form.processing" icon="pi pi-check"
                            severity="success" />
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>