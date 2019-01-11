<template>
    <v-layout v-if="canRenderMap">
        <g-map :propUsers="users" :propMapProperties="mapProperties"></g-map>
    </v-layout>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import GMap from './components/GlobalMap/GMap'
export default {
    data() {
        return {
            default: true,
            allLoaded: false,
            mapProperties: null
        }
    },
    components: {
        GMap
    },
    computed: {
        ...mapGetters([
            'userGeolocation',
            'users',
            'isGlobalMapLoaded',
            'isGeolocationAvailable'
        ]),
        canRenderMap() {
            var isLoaded = this.userGeolocation
            var isAvailable = this.isGeolocationAvailable
            if (isLoaded && isAvailable) {
                const latLng = new google.maps.LatLng(isLoaded.lat, isLoaded.lng)
                var properties = {
                    center:latLng,
                    zoom: 6,
                    maxZoom: 15,
                    minZoom: 3,
                    streetViewControl: false
                }
                this.mapProperties = properties
                return true
            }
            return false
        }
    },
    methods: {
        ...mapActions([
            'fetchUserGeolocation'
        ]),
        ...mapMutations([
            'setUserGeolocation',
            'setUserToShow',
            'setGlobalMapLoaded'
        ])
    },
    beforeCreate() {
        this.$store.dispatch('fetchUserGeolocation').then(() => {
            if (this.$store.getters.isGeolocationAvailable) {
                this.$store.dispatch('fetchUsers').then(() => {

                })
            } else {
                this.$store.commit('setGlobalMapLoaded', false)
            }
        })
    },
    beforeDestroy() {
        this.$store.commit('setGlobalMapLoaded', false)
    }
}
</script>

<style scoped>

.google-map{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
}

</style>
