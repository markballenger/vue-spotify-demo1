// import http from 'http'
import axios from 'axios'
let token
export default {
	setToken: function (t) {
		token = t
	},
	get: function (path) {
		if (!token)	{
			window.location = 'http://localhost:8080/login'
		}
		let http = axios.create({baseURL: 'https://api.spotify.com/v1/'})
		http.defaults.headers.common['Authorization'] = `Bearer ${token}`
		return http.get(path)
	}
}
