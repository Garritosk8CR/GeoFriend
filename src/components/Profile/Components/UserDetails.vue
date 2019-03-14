<template>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
            <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline font-weight-medium">{{userToShow.name}}</span>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-img>
            <v-card-title>
                <v-layout align-start justify-start column >
                    <h3 class="headline"> User Details</h3>
                </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-container>
                <v-layout align-start justify-start column fill-height>
                    <h5 body-2>Email:</h5>
                    <span body-1>{{userToShow.email}}</span>
                    <h5 body-2>Name:</h5>
                    <span body-1>{{userToShow.name}}</span>
                    <h5 body-2>Alias:</h5>
                    <span body-1>{{userToShow.alias}}</span>
                </v-layout>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'userToShow'
        ])
    },
    created() {
        console.log(this.userToShow )
    }
}

</script>

<style scoped>

</style>
