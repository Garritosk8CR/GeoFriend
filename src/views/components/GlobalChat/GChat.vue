<template>
    <v-layout align-start justify-center row>
        <v-flex xs8 md8 sm8 offset-xs1>
            <v-card>
                <v-toolbar color="orange" dark>
                    <v-toolbar-title>Global Chat</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <messages v-if="areMessagesLoaded" :propGlobalMessages="globalMessages" v-chat-scroll></messages>
                <v-divider></v-divider>
                <message-input-field></message-input-field>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import Messages from './Messages'
import MessageInputField from './MessageInputField'
export default {
    data: () => ({

    }),
    components: {
        Messages,
        MessageInputField
    },
    computed: {
        ...mapGetters([
            'globalMessages',
            'areMessagesLoaded'
        ])
    },
    beforeCreate() {
        if(!this.$store.getters.listen) {
            this.$store.dispatch('listenForNewMessages')
        } else {
            this.$store.dispatch('fetchGlobalMessages')
        }
        // this.$store.dispatch('fetchUsers').then( () => {

        // })
    },
    beforeDestroy() {
        this.$store.dispatch('resetGlobalChat')
    }
}

</script>
<style scoped>

</style>
