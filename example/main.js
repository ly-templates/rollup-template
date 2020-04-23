import Vue from 'vue'
import App from './App'
import elSwitch from '../dist/library.min.js'
import "../dist/library.min.css"

Vue.config.productionTip = false
Vue.use(elSwitch)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})