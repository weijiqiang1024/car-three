import Vue from 'vue'
import App from './App.vue'
import '@/assets/scss/index.scss'


import * as THREE from 'three'

Vue.config.productionTip = false

Vue.prototype.THREE = THREE

new Vue({
  render: h => h(App),
}).$mount('#app')
