<template>

  <v-app id="app" dark toolbar>
    <header-bar ></header-bar>
    <v-container id="container" fluid fill-height>
      <v-layout column
                v-touch.prevent="{
                  left: () => swipe('Left'),
                  right: () => swipe('Right')
                }">
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
      </v-layout>
    </v-container>
    
  </v-app>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
import _ from 'lodash'
export default {
  name: 'app',
  mounted () {
  },
  methods: {
    swipe (direction) {
      if (this.$route) {
        let index = _.findIndex(this.$router.options.routes, { name: this.$route.name })
        if (direction === 'Left') {
          index++
        } else {
          index--
        }
        let toRoute = this.$router.options.routes[index]
        this.$router.push(toRoute)
      }
    }
  },
	components: {
		HeaderBar
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
