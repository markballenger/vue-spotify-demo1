<template >
  
  <div >
    
    <v-navigation-drawer 
      dark 
      permanent
      absolute
      :mini-variant.sync="mini" 
      v-model="drawer" 
      overflow>
      
      <v-toolbar  flat class="transparent">
        <v-list class="pa-0">

          <!-- todo: implement avatar component -->
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Mark Ballenger</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <!-- /todo: implement avatar component -->

        </v-list>
      </v-toolbar>

      
      <v-list class="pt-0" dense dark>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" dark  :key="item.title" :to="item.route" @click="mini = true">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title @click="close()">
              {{item.title}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>



    <v-toolbar fixed  dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
        ...mapGetters([])
    },
    methods: {
        close: function () {
            this.mini = true
        }
    },
	data () {
		return {
			drawer: null,
			items: [
                { title: 'Hello World', icon: 'home', route: '/' },
                { title: 'Artists', icon: 'bookmark', route: '/artists' }
            ],
            mini: true,
            right: null
		}
	}
}
</script>

