import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Artists from '@/pages/Artists'
import Auth from '@/pages/Auth'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: HelloWorld
		},
		{
			path: '/artists',
			name: 'Artists',
			component: Artists
		},
		{
			path: '/auth/:access_token/:refresh_token',
			name: 'Auth',
			component: Auth
		}
	]
})
