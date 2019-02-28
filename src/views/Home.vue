<template>
    <v-container fluid fill-height grid-list-xl>
        <v-layout align-center justify-center row wrap>
            <template v-for="item in items">
                <v-flex xs8 sm4 md3 align-self-center d-flex :key="item.headline">
                    <home-item  :pIcon="item.icon" :pHeadline="item.headline" :pColor="item.color"></home-item>
                </v-flex>
            </template>
        </v-layout>
    </v-container>
</template>

<script>
import Item from './components/Home/Item'
export default {
    components: {
        'home-item':Item
    },
    data: () => ({
        items: [
            {
                icon: 'map',
                headline: 'Gmap',
                color: 'green darken-2'
            },
            {
                icon: 'public',
                headline: 'Global Chat',
                color: 'amber darken-3'
            },
            {
                icon: 'face',
                headline: 'Profile',
                color: 'light-blue darken-2'
            }
        ]
    }),
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
