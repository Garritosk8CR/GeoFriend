<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <user-details></user-details>
            <user-wall></user-wall>
        </v-layout>
    </v-container>
</template>

<script>
import UserDetails from './Components/UserDetails'
import UserWall from './Components/Wall'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {

        }
    },
    components: {
        UserDetails,
        UserWall
    },
    computed: {
        ...mapGetters([
            'userToShow',
            'user'
        ])
    }

}

</script>

<style scoped>

</style>
