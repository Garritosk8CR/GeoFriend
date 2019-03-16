<template>
    <v-container fluid fill-height grid-list-md >
        <v-layout align-center justify-center row wrap >
            <template v-for="item in items">
                <v-flex xs12 sm4 md2 align-self-center d-block :key="item.headline" :style="{'height': '22%'}" >
                    <home-item  :pIcon="item.icon" :pHeadline="item.headline" :pColor="item.color"></home-item>
                <v-flex xs8 sm4 md3 align-self-center d-flex :key="item.headline">
                    <home-item
                        :pIcon="item.icon"
                        :pHeadline="item.headline"
                        :pColor="item.color"
                        :prouteName="item.routeName"
                        :p_isProfile="item.isProfile"
                    ></home-item>
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
                color: 'green darken-2',
                routeName: 'gmap',
                isProfile: false
            },
            {
                icon: 'public',
                headline: 'Global Chat',
                color: 'amber darken-3',
                routeName: 'gchat',
                isProfile: false
            },
            {
                icon: 'face',
                headline: 'Profile',
                color: 'light-blue darken-2',
                routeName: 'profile',
                isProfile: true
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
