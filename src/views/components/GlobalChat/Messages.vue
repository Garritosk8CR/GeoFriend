<template>
    <v-list three-line class="messages">
        <v-list-tile avatar v-if="areMessagesNotEmpty" v-for="(message, index) in propGlobalMessages" :key="index">
            <message :propMessage="message"></message>
        </v-list-tile>
    </v-list>
</template>

<script>
import Message from './Message'
export default {
    props: ['propGlobalMessages'],
    data: () => ({
        lastIndex: 0
    }),
    components: {
        Message
    },
    computed: {
        areMessagesNotEmpty() {
            var isNotEmpty = false
            if(this.propGlobalMessages.length > 0) {
                isNotEmpty = true
            }
            return isNotEmpty
        }
    },
    methods: {

    },
    created() {
        if(this.areMessagesNotEmpty) {
            this.lastIndex = this.propGlobalMessages.length - 1
        }
    }
}

</script>

<style scoped>
.messages{
    max-height: 300px;
    overflow: auto;
}
.messages::-webkit-scrollbar {
    width: 3px;
}
.messages::-webkit-scrollbar-track {
    background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
    background: #aaa;
}
</style>
