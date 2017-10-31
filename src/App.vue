<template>
  <v-app id="app" dark toolbar>

    <header-bar ></header-bar>

    <v-container id="container" fluid fill-height>
      <v-layout>
        <v-flex xs6 offset-xs3>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    
  </v-app>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
export default {
	name: 'app',
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
  margin-top: 60px;
  color: white;
}
</style>
