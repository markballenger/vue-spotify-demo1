import Vuex from 'vuex'
import Vue from 'vue'
import artists from './artists'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		artists
	}
})
