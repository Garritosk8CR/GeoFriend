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
                <v-container align-start fluid>
                    <v-layout align-center justify-center fill-height row>
                        <h3 class="headline"> User Details</h3>
                    </v-layout>
                    <div>
                        <v-divider></v-divider>
                        <br/> <br/>
                        <span>Email: {{userToShow.email}}</span><br>
                        <span>Alias: {{userToShow.alias}}</span>
                    </div>
                </v-container>
            </v-card-title>
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
    }
}

</script>

<style scoped>

</style>
