<template >
  
  <div >
    
    <v-navigation-drawer 
      dark 
      permanent
      :mini-variant.sync="mini" 
      overflow>
      
      <v-toolbar  flat class="transparent">
        <v-list>

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

      
        <v-list dense dark>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" dark  :key="item.title" :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{item.title}}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        
    </v-navigation-drawer>

    
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
      ...mapGetters([])
  },
  methods: {
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

