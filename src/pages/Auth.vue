<template>

    <div>
        access_token: {{$route.params.access_token}}
    </div>

</template>

<script>
import spotify from '../spotify'
export default {
    mounted () {
        spotify.setToken(this.$route.params.access_token)
        // this.$router.push('/artists')
    }
}
</script>

<style>

</style>