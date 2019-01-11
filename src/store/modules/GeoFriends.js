import router from '@/router'
const state = {
    globalMapLoaded: false,
    mapProperties: null,
    usersMarkers: null,
    markersLoaded: false
}

const getters = {

    isGlobalMapLoaded(state) {
        return state.GlobalMapLoaded
    },
    mapProperties(state) {
        return state.mapProperties
    },
    markers(state) {
        return state.usersMarkers
    },
    areMarkersLoaded(state) {
        return state.markersLoaded
    }
}

const mutations = {

    setGlobalMapLoaded(state, isLoaded) {
        state.globalMapLoaded = isLoaded
    },
    setMapProperties(state, properties) {
        state.mapProperties = properties
    },
    setMarkers(state, markers) {
        state.usersMarkers = markers
    },
    setUserMarker(state, marker) {
        state.usersMarkers.push(marker)
    },
    setMarkersLoaded(state, isLoaded) {
        state.markersLoaded = isLoaded
    }

}

const actions = {
    loadUserMarker({commit},params) {
        if(params.user.geolocation) {
            var userMarker = {
                user: params.user,
                marker: new google.maps.Marker({
                    position: {
                        lat: params.user.geolocation.lat,
                        lng: params.user.geolocation.lng
                    },
                    visible: true
                })
            }
            userMarker.marker.setMap(params.map)
            userMarker.marker.addListener('click', () => {
                commit('setUserToShow',user)
                router.push({name: 'profile'})
            })
            return userMarker
        }
    },
    loadUsersMarkers({commit}, params) {

        var markers = []
        params.users.forEach( user => {
            if(user.geolocation) {
                var userMarker = {
                    user: user,
                    marker: new google.maps.Marker({
                        position: {
                            lat: user.geolocation.lat,
                            lng: user.geolocation.lng
                        },
                        map: params.map
                    })
                }
                userMarker.marker.setMap(params.map)
                userMarker.marker.addListener('click', () => {
                    commit('setUserToShow',user)
                    router.push({name: 'profile'})
                })
                markers.push(userMarker)
            }

        })
        console.log('------------------------------------');
        console.log(markers);
        console.log('------------------------------------');
        commit('setMarkers', markers)
        commit('setMarkersLoaded', true)
        return markers
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
