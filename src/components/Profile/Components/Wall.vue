<template>
    <v-flex xs12 sm6 offset-sm3>
        <v-card color="grey lighten-5" class="white--text">
            <v-card-text class="">

                <v-text-field v-model="postMessage" :rules="postMessageRules" :counter="100" label="Write new post..." required @keypress.enter="newPost()"></v-text-field>

            </v-card-text>
            <template  v-for="post in posts">
                <user-post v-if="post" :post="post"></user-post>
            </template>

        </v-card>
    </v-flex>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UserPost from './Post'
export default {
    data() {
        return {
            valid: false,
            postMessage: '',
            postMessageRules: [
                v => v.length <= 100 || 'Name must be less than 100 characters'
            ]
        }
    },
    components: {
        UserPost
    },
    computed: {
        ...mapGetters([
            'userToShow',
            'user',
            'posts'
        ])
    },
    methods: {
        ...mapActions([
            'fetchUserPosts'
        ]),
        newPost() {
            if(this.postMessage != '') {
                var payload = {
                    postMessage: this.postMessage,
                    fromUser: this.user,
                    toUser: this.userToShow
                }
                this.$store.dispatch('addNewPost', payload).then(() => {
                    this.postMessage = ''
                })
            }
        }
    },
    beforeCreate() {
        this.$store.dispatch('fetchUserPosts')
    }
}

</script>

<style scoped>

</style>
