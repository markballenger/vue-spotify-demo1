<template>
  <v-layout row>
    <v-flex xs12 sm12 offset-sm1>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Artists</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="item in artists">
            <v-list-tile avatar v-bind:key="item.name" >
              <v-list-tile-avatar>
                <img v-bind:src="item.images[0].url" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.genres[0]"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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