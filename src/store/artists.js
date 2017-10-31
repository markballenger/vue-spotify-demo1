// import http from '../http'
import spotify from '../spotify'

const state = {
	artists: []
}

const actions = {
	getArtists ({commit}) {
		spotify.get('me/following?type=artist').then(response => {
			commit('get_artists', response.data.artists.items)
		})
		// let fakeData = [
        //     { name: 'Jimi Hendrix' },
        //     { name: 'Tom Petty' }
		// ]
	}
}

const mutations = {
  // todo
	get_artists (state, artists) {
		state.artists = artists
	}
}

const getters = {
  // todo
	artists (state, getters, rootState) {
		return state.artists
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
