import Vue from 'vue'
import App from './App'
{{#if_eq module 'es'}}
import elSwitch from '../dist/{{name}}.es.js'
{{/if_eq}}
{{#if_eq module 'umd'}}
import elSwitch from '../dist/{{name}}.umd.js'
{{/if_eq}}
{{#if_eq module 'cjs'}}
import elSwitch from '../dist/{{name}}.cjs.js'
{{/if_eq}}

import "../dist/{{name}}.min.css"

Vue.config.productionTip = false
Vue.use(elSwitch)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})