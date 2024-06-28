<script setup>
import { defineProps } from 'vue';
// Definir props
const props = defineProps({
  resultado: String,
  show:Boolean,
  bgColor:String
});
</script>
<template>
    <v-container v-show="show">
        <v-row class="text-center justify-end">
            <v-col class="" cols="8">
                <h4 :class="bgColor" class="py-4">
                    {{ resultado }}
                </h4>
            </v-col>
        </v-row>
    </v-container>

</template>