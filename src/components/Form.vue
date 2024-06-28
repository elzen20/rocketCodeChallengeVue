<script setup>
import { ref, watch } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  formData: Object,
  campos: Array,
  onSubmit: Function,
  onUnsubmit: Function,
  title: String,
  show: Boolean
});

const valid = ref(false);

watch(valid, (newVal) => {
  if (newVal) {
    props.onSubmit();
  } else {
    props.onUnsubmit();
  }
});
</script>

<template>
  <v-container v-if="show">
    <v-row class="d-flex">
      <v-col cols="4">
        <v-avatar class="align-center" size="80">
          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="8" class="bg-grey">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <h5 class="text-center">{{ title }}</h5>
              <v-col v-for="(campo, index) in campos" :key="index" cols="12">
                <h5 class="text-center">{{ campo.label }}</h5>
                <v-text-field
                  v-model="formData[campo.model]"
                  :rules="campo.rules"
                  :label="campo.label"
                  required
                  :type="campo.type" 
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
