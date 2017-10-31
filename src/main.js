// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'

/*
* import vuetify and add it to vue
* also import mdi materialdesignicons for icons
*/
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'mdi/css/materialdesignicons.css'

Vue.use(Vuetify)

sync(store, router)

// Set this to false to prevent the production tip on Vue startup
Vue.config.productionTip = false

// make sure to set this synchronously immediately after loading Vue
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
