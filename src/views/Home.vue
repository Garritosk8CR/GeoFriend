<template>
    <v-container fluid fill-height grid-list-xl>
        <v-layout align-center justify-center row wrap>
            <v-flex xs8 sm4 md3 align-self-center d-flex>
                <div class="item elevation-5 text-center green darken-2">
                    <v-icon color="grey lighten-2" size="100">map</v-icon>
                    <h6 class="headline " :style="{'color': '#E0E0E0'}">Gmap</h6>
                </div>
            </v-flex>
            <v-flex xs8 sm4 md3 align-self-center d-flex>
                <div class="item elevation-5 text-center amber darken-3">
                    <v-icon color="grey lighten-2" size="105">public</v-icon>
                    <h6 class="headline " :style="{'color': '#E0E0E0'}">Global Chat</h6>
                </div>
            </v-flex>
            <v-flex xs8 sm4 md3 align-self-center d-flex>
                <div class="item elevation-5 text-center light-blue darken-2">
                    <v-icon color="grey lighten-2" size="105">face</v-icon>
                    <h6 class="headline " :style="{'color': '#E0E0E0'}">Profile</h6>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    components: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>
.resultContainer {
    height: 350px;
}

.item {
    min-height: 50px;
    min-width: 80px;

    width: 250px;
    height: 150px;
}
</style>
