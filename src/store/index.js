import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      nombreCompletoForm: {
        nombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
      isNombreCompletoFormDone: false,
      fechaNacimientoForm: {
        dia: "",
        mes: "",
        año: "",
      },
      isFechaNacimientoFormDone: false,
      datosContactoForm: {
        correo: "",
        celular: "",
      },
      isDatosContactoFormDone: false,
    };
  },
  mutations: {
    SET_NOMBRE_COMPLETO_FORM(state, payload) {
      state.nombreCompletoForm = { ...state.nombreCompletoForm, ...payload };
    },
    RESET_NOMBRE_COMPLETO_FORM(state) {
      state.nombreCompletoForm = {
        nombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      };
    },
    SET_IS_NOMBRE_COMPLETO_FORM_DONE(state, payload) {
      state.isNombreCompletoFormDone = payload;
    },
    SET_FECHA_NACIMIENTO_FORM(state, payload) {
      state.fechaNacimientoForm = { ...state.fechaNacimientoForm, ...payload };
    },
    RESET_FECHA_NACIMIENTO_FORM(state) {
      state.fechaNacimientoForm = {
        dia: "",
        mes: "",
        año: "",
      };
    },
    SET_IS_FECHA_NACIMIENTO_FORM_DONE(state, payload) {
      state.isFechaNacimientoFormDone = payload;
    },
    SET_DATOS_CONTACTO_FORM(state, payload) {
      state.datosContactoForm = { ...state.datosContactoForm, ...payload };
    },
    RESET_DATOS_CONTACTO_FORM(state) {
      state.datosContactoForm = {
        correo: "",
        celular: "",
      };
    },
    SET_IS_DATOS_CONTACTO_FORM_DONE(state, payload) {
      state.isDatosContactoFormDone = payload;
    },
  },
  actions: {
    updateNombreCompletoForm({ commit }, payload) {
      commit("SET_NOMBRE_COMPLETO_FORM", payload);
    },
    resetNombreCompletoForm({ commit }) {
      commit("RESET_NOMBRE_COMPLETO_FORM");
    },
    updateIsNombreCompletoFormDone({ commit }, payload) {
      commit("SET_IS_NOMBRE_COMPLETO_FORM_DONE", payload);
    },
    updateFechaNacimientoForm({ commit }, payload) {
      commit("SET_FECHA_NACIMIENTO_FORM", payload);
    },
    resetFechaNacimientoForm({ commit }) {
      commit("RESET_FECHA_NACIMIENTO_FORM");
    },
    updateIsFechaNacimientoFormDone({ commit }, payload) {
      commit("SET_IS_FECHA_NACIMIENTO_FORM_DONE", payload);
    },
    updateDatosContactoForm({ commit }, payload) {
      commit("SET_DATOS_CONTACTO_FORM", payload);
    },
    resetDatosContactoForm({ commit }) {
      commit("RESET_DATOS_CONTACTO_FORM");
    },
    updateIsDatosContactoFormDone({ commit }, payload) {
      commit("SET_IS_DATOS_CONTACTO_FORM_DONE", payload);
    },
  },
});

export default store;
