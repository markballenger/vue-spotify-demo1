<template>
<div>
  <div v-for="a in artists" :key="a.name">
   {{ a.name }}
  </div>
 </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
      mounted () {
        this.getArtists()
      },
      computed: {
        ...mapGetters([
            'artists'
        ])
      },
      methods: {
        ...mapActions([
            'getArtists'
        ])
      }
  }
</script>

<style>
* {color: white;}
</style>