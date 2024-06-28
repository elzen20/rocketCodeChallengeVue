import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store/index'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(store).mount('#app')
