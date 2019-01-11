<template>
    <v-layout align-center justify-center fill-height :style="headerStyle">
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="email" v-model="email" name="email" label="Email" type="text"></v-text-field>
                        <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-chip v-if="authError" label outline color="red">{{authError}}</v-chip>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
    data: () => ({
        drawer: null,
        email: '',
        password: ''
    }),
    props: {
        source: String,
        image: {
            type: String,
            default: require('@/assets/img/b3.jpg')
        }
    },
    computed: {
        ...mapGetters(['authError']),
        headerStyle() {
            return {
                height: '100%',
                overflow: 'hidden',
                background: `url(${this.image}) no-repeat 0 0 fixed`,
                'background-size': 'cover',
                position: 'initial',
                width: '100%'
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })

        }
    },
    created() {

    }
}
</script>

<style scoped>
</style>
