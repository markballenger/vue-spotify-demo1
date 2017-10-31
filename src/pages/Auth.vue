<template>

      <v-layout row>
          <v-flex xs12 sm12 offset-sm3>
        access_token: {{$route.params.access_token}}
        </v-flex>
    </v-layout>

</template>

<script>
import spotify from '../spotify'
export default {
    mounted () {
        if (this.$route.params.access_token) {
            spotify.setToken(this.$route.params.access_token)
        }
    }
}
</script>

<style>

</style>