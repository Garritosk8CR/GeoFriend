<template>
    <v-layout v-if="!showChat" align-center justify-space-around column fill-height :style="userMenuStyle">
        <v-layout justify-space-around align-center column>
            <v-flex xs12 justify-space-around>
                <br />
                <br />
                <h1 class="font-weight-medium mb-2  display-2 text-xs-center" :style="{color: '#616161'}">Global Chat</h1>
            </v-flex>
        </v-layout>
        <v-layout justify-center fill-height align-center row>
            <v-flex xs12 align-center justify-center fill-height class="text-xs-center">
                <div class="subheading mb-3 text-xs-center">
                    <br />
                    <br />
                    <v-icon size="200" color="#FFB300">public</v-icon>
                    <br />
                    <br />
                    <br />
                    <p :style="{color: '#757575'}">Made by Emilio M. Rangel</p>
                    <p :style="{color: '#757575'}">
                        &
                    </p>
                    <p :style="{color: '#757575'}">Powered by vue-vuex-Vuetify-firebase. 2018</p>
                </div>
                <v-btn class="yellow darken-3 mt-5" @click="enterChat()" dark large>
                    Enter Global Chat
                </v-btn>
            </v-flex>
        </v-layout>
    </v-layout>
    <v-layout align-start justify-center row fill-height v-else :style="{padding: '30px 0px 0px 0px'}">
        <g-chat></g-chat>
    </v-layout>
</template>

<script>
const GChat = () => import('./components/GlobalChat/GChat.vue')
export default {
    components: {
        GChat
    },
    data() {
        return {
            userMenuStyle: {

                overflow: 'hidden',

                'background-size': 'cover',
                'background-color': '#EEEEEE'
            },
            showChat: false
        }
    },
    props: {
        source: String,
        image: {
            type: String,
            default: require('@/assets/img/globalBackground.png')
        }
    },
    methods: {
        enterChat() {
            this.showChat = true
        }
    }
}

</script>

<style scoped>

</style>
