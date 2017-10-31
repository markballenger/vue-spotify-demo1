<template>
<div>
  <v-layout row>
    <v-flex xs12 sm12 >

      <v-container fluid grid-list-sm>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs2 v-for="a in artists" :key="a.name">
              <v-card>
                <v-card-media>
                  <img class="image" :src="a.images[1].url"  :width="100" :height="100">
                </v-card-media>
                <v-card-actions>
                  <v-btn icon>
                    <v-icon>home</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        
      </v-container>
    </v-flex>
  </v-layout>
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