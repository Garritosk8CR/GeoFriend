<template>
    <div class="map" >
        <div class="google-map" id="map" v-show="isLoaded"></div>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    name:'g-map',
    data() {
        return {
            map: null,
            userMarkers: null,
            loaded: false
        }
    },
    props: [
        'propUsers',
        'propMapProperties'
    ],
    computed: {
        isLoaded() {
            var isLoaded = this.map
            if(isLoaded) {
                var params2 = {
                    users: this.propUsers,
                    map: this.map
                }
                return this.$store.dispatch('loadUsersMarkers',params2).then(() => {
                    return true
                })

            }
            return false

        },
        ...mapGetters([
            'userGeolocation',
            'markers',
            'areMarkersLoaded'
        ])
    },
    methods: {

        renderMap() {

            const div = document.getElementById('map')
            this.map = new google.maps.Map(div, this.propMapProperties)

            var arrayMap = Array.prototype.map



        },
        ...mapMutations([
            'setUserToShow'
        ])
    },
    mounted() {
        this.renderMap()
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
