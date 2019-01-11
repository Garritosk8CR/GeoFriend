<template>
    <v-card-actions>
        <v-text-field flat placeholder="Send message" :rules="messageRules" :counter="100" label="Write new message..." required @keypress.enter.prevent="sendMessage()" v-model="message" ></v-text-field>
    </v-card-actions>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data: () => ({
        message: '',
        messageRules: [
                v => v.length <= 100 || 'message must be less than 100 characters'
            ]
    }),
    methods: {
        ...mapActions([
            'addNewGlobalMessage'
        ]),
        sendMessage() {
            if(this.message != '') {
                this.addNewGlobalMessage(this.message).then( () => {
                    this.message = ''
                })
            }
        }
    }
}

</script>
<style scoped>

</style>
