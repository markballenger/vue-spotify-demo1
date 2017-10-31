<template>
      <div>
        access_token: {{$route.params.access_token}}
    </div>

</template>

<script>
import spotify from '@/spotify'
export default {
  name: 'HelloWorld',
  mounted () {
      spotify.setToken(this.$route.params.access_token)
      // this.$router.push('/artists')
  },
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
