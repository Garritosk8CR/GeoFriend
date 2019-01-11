<template>
    <v-list-tile-content>
        <v-list-tile-title class="title grey--text" @click="goToProfile()"> {{propMessage.userAlias}}</v-list-tile-title>
        <v-list-tile-title>{{propMessage.message}}</v-list-tile-title>
        <v-list-tile-sub-title class="caption grey--text">{{propMessage.timestamp}}</v-list-tile-sub-title>
    </v-list-tile-content>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
    data: () => ({

    }),
    props: ['propMessage'],
    methods: {
        ...mapActions([
            'getUserById'
        ]),
        ...mapMutations([
            'setUserToShow'
        ]),
        goToProfile() {
            this.getUserById(this.propMessage.userId).then(user => {
                this.setUserToShow(user)
                this.$router.push({name: 'profile'})
            })
        }
    }
}

</script>
<style scoped>

</style>
