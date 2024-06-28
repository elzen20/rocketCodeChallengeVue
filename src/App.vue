<script setup>
import { ref, computed, nextTick } from 'vue';
import Form from './components/Form.vue';
import Header from './components/Header.vue';
import Response from './components/Response.vue';
import { useStore } from 'vuex';
import { insertUser } from './data/services/rocket.service';

const store = useStore();

const isServerResponseDone = ref(false);
const serverResponse = ref("");
const serverResponseBgColor = ref("");

const nombreCompletoForm = computed(() => store.state.nombreCompletoForm);
const isNombreCompletoFormDone = computed(() => store.state.isNombreCompletoFormDone);
const fechaNacimientoForm = computed(() => store.state.fechaNacimientoForm);
const isFechaNacimientoFormDone = computed(() => store.state.isFechaNacimientoFormDone);
const datosContactoForm = computed(() => store.state.datosContactoForm);
const isDatosContactoFormDone = computed(() => store.state.isDatosContactoFormDone);

const nombreCompletoCampos = [
  { model: 'nombre', rules: [value => value ? true : 'El nombre es requerido.'], label: 'Nombre', type: 'text' },
  { model: 'segundoNombre', rules: [], label: 'Segundo Nombre', type: 'text' },
  { model: 'apellidoPaterno', rules: [value => value ? true : 'El apellido paterno es requerido.'], label: 'Apellido Paterno', type: 'text' },
  { model: 'apellidoMaterno', rules: [value => value ? true : 'El apellido materno es requerido.'], label: 'Apellido Materno', type: 'text' }
];

const fechaNacimientoCompletaCampos = [
  {
    model: 'dia', 
    rules: [
      value => value ? true : 'El día es requerido.', 
      value => value.length === 2 ? true : 'Tienen que ser 2 caracteres',
      value => (value >= 1 && value <= 31) ? true : 'El día debe estar entre 1 y 31'
    ], 
    label: 'Día', 
    type: 'number'
  },
  {
    model: 'mes', 
    rules: [
      value => value ? true : 'El mes es requerido.', 
      value => value.length === 2 ? true : 'Tienen que ser 2 caracteres',
      value => (value >= 1 && value <= 12) ? true : 'El mes debe estar entre 1 y 12'
    ], 
    label: 'Mes', 
    type: 'number'
  },
  {
    model: 'año', 
    rules: [
      value => value ? true : 'El año es requerido.', 
      value => value.length === 4 ? true : 'Tienen que ser 4 caracteres',
      value => (value >= 1900 && value <= new Date().getFullYear()) ? true : `El año debe estar entre 1900 y ${new Date().getFullYear()}`
    ], 
    label: 'Año', 
    type: 'number'
  }
];

const datosContactoCompletaCampos = [
  {
    model: 'correo', rules: [value => value ? true : 'El correo es requerido.', value => {
      if (/.+@.+\..+/.test(value)) return true;
      return 'El e-mail debe ser válido.';
    }], label: 'Correo electrónico', type: 'email'
  },
  { model: 'celular', rules: [value => value ? true : 'El celular es requerido.', value => {
      if (value?.length == 8) return true;
      return 'Tienen que ser 8 caracteres.';
    }], label: 'Teléfono Celular', type: 'number' }
];

const nombreCompleto = computed(() => {
  const form = store.state.nombreCompletoForm;
  return `${form.nombre} ${form.segundoNombre} ${form.apellidoPaterno} ${form.apellidoMaterno}`.trim();
});

const handleNombreCompletoFormSubmit = async () => {
  await store.dispatch('updateIsNombreCompletoFormDone', true);
  scrollToBottom();
};

const unHandleNombreCompletoFormSubmit = async () => {
  await store.dispatch('updateIsNombreCompletoFormDone', false);
  scrollToBottom();
};

const fechaNacimientoCompleto = computed(() => {
  const form = store.state.fechaNacimientoForm;
  return `${form.dia} ${form.mes} ${form.año}`.trim();
});

const handleFechaNacimientoFormSubmit = async () => {
  await store.dispatch('updateIsFechaNacimientoFormDone', true);
  scrollToBottom();
};

const unHandleFechaNacimientoFormSubmit = async () => {
  await store.dispatch('updateIsFechaNacimientoFormDone', false);
  scrollToBottom();
};

const datosContactoCompleto = computed(() => {
  const form = store.state.datosContactoForm;
  return `Correo electrónico: ${form.correo}\r\n\r\nTeléfono Celular: ${form.celular}`.trim();
});

const handleDatosContactoFormSubmit = async () => {
  await store.dispatch('updateIsDatosContactoFormDone', true);
  scrollToBottom();
};

const unHandleDatosContactoFormSubmit = async () => {
  await store.dispatch('updateIsDatosContactoFormDone', false);
  scrollToBottom();
};

const iniciar = async () => {
  const nombre = store.state.nombreCompletoForm;
  const fecha = store.state.fechaNacimientoForm;
  const datos = store.state.datosContactoForm;

  try {
    const response = await insertUser({
      nombre: nombre.nombre,
      segundoNombre: nombre.segundoNombre,
      apellidoPaterno: nombre.apellidoPaterno,
      apellidoMaterno: nombre.apellidoMaterno,
      fechaDeNacimiento: `${fecha.año}-${fecha.mes}-${fecha.dia}`.trim(),
      email: datos.correo,
      telefono: datos.celular
    });
    const formattedDate = formatDate(response.data.fechaDeNacimiento);
    isServerResponseDone.value = true;
    serverResponse.value = `Correo electrónico: ${response.data.email}\r\n\r\n
    Nombre: ${response.data.nombre} ${response.data.segundoNombre} ${response.data.apellidoPaterno} ${response.data.apellidoMaterno}\r\n\r\n
    Teléfono: ${response.data.telefono}\r\n\r\n
    Fecha: ${formattedDate}`;
    serverResponseBgColor.value = "bg-pink";
  } catch (error) {
    serverResponseBgColor.value = "bg-red";
    isServerResponseDone.value = true;
    serverResponse.value = `Error al insertar el Usuario`;
    console.error('Error al insertar usuario:', error);
  }
  nextTick(() => scrollToBottom());
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
};
</script>

<template>
  <Header />
  <Form :show="true" title="¿Cuál es tu nombre?" :formData="nombreCompletoForm" :campos="nombreCompletoCampos" @submit="handleNombreCompletoFormSubmit" @unsubmit="unHandleNombreCompletoFormSubmit" />
  <Response bgColor="bg-pink" :show="isNombreCompletoFormDone" :resultado="nombreCompleto" />
  <Form :show="isNombreCompletoFormDone" title="¿Cuál es tu fecha de nacimiento?" :formData="fechaNacimientoForm" :campos="fechaNacimientoCompletaCampos" @submit="handleFechaNacimientoFormSubmit" @unsubmit="unHandleFechaNacimientoFormSubmit" />
  <Response bgColor="bg-pink" :show="isFechaNacimientoFormDone" :resultado="fechaNacimientoCompleto" />
  <Form :show="isFechaNacimientoFormDone" title="Datos de Contacto" :formData="datosContactoForm" :campos="datosContactoCompletaCampos" @submit="handleDatosContactoFormSubmit" @unsubmit="unHandleDatosContactoFormSubmit" />
  <Response bgColor="bg-pink" :show="isDatosContactoFormDone" :resultado="datosContactoCompleto" />
  <Response bgColor="bg-grey" :show="isDatosContactoFormDone" resultado="Si tus datos son correctos por favor continuemos" />
  <v-container class="d-flex justify-center pb-5" v-if="isDatosContactoFormDone">
    <v-btn class="bg-pink py-3 px-5 mx-5" @click="iniciar">Iniciar</v-btn>
  </v-container>
  <Response :bgColor="serverResponseBgColor" :show="isServerResponseDone" :resultado="serverResponse" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
