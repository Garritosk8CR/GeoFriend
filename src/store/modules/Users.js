//import axios_user from '../../axios-users.js'
import db from '@/db'
import Router from '@/router'
const state = {
    user: {

    },
    geolocation : null,
    geolocationAvailable: true,
    users: []
}

const getters = {
    user(state) {
        return state.user
    },
    users(state) {
        return state.users
    },
    userGeolocation(state) {
        return state.geolocation

    },
    isGeolocationAvailable(state) {
        return state.geolocationAvailable
    }
}

const mutations = {
    storeUser(state, user) {
        state.user = user
    },
    storeUsers(state, users) {
        state.users = users
    },
    setUserGeolocation(state, userGeolocation) {

        state.geolocation = userGeolocation
    },
    setCurrentUser(state, user) {
        state.user = user
    },
    setUsers(state, users) {
        state.users = users
    },
    setGeolocationAvailable(state, isAvailable) {
        state.geolocationAvailable = isAvailable
    }
}

const actions = {
    storeUser({ commit, state, rootState, dispatch }, payload ) {
        db.collection('Users').doc(payload.slug).set({
            ...payload,
            geolocation: null
        })
        .then(res => {
            dispatch('login', payload)
        })
        .catch(error => console.log(error))
    },
    fetchUser({ commit, getters }) {
        var logedUserId = getters.getLogedUser
        db.collection('Users').where('id', '==', logedUserId.id).get()
        .then( querySnapshot => {
            querySnapshot.forEach(element => {
                commit('setCurrentUser', element.data())
            })
        })
        .catch(error => console.log(error))
    },
    fetchUsers({commit}){
        db.collection('Users').get()
        .then( querySnapshot => {
            var map = Array.prototype.map
            commit('setUsers', map.call(querySnapshot.docs, user => user.data()))

        })
        .catch(error => console.log(error))
    },
    fetchUserGeolocation({commit, state}) {
        if(navigator.geolocation) {

            navigator.geolocation.getCurrentPosition( pos => {

                var geolocation = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                commit('setGeolocationAvailable', true)
                commit('setUserGeolocation', geolocation)
            },
            error => {
                commit('setGeolocationAvailable', false)
                console.log(error)
            },
            {
                maximumAge: 60000,
                timeout: 3000
            })
        } else {
            commit('setGeolocationAvailable', false)
        }
    },
    updateUserGeolocation({commit, getters, dispatch}, location) {
        db.collection('Users').where('id', '==', getters.getLogedUser.id).get()
        .then( querySnapshot => {
            querySnapshot.forEach(element => {
                db.collection('Users').doc(element.data().slug).update(
                    {
                        geolocation: {
                            lat: location.latitude,
                            lng: location.longitude
                        }
                    }
                )
            })
        })
        .catch(error => console.log(error))
        dispatch('fetchUser')
    },
    getUserById({state}, userId) {
        if(state.users.length > 0) {
            var user =  state.users.find(user => user.id == userId)
            return user
        }

        var result = db.collection('Users').where('id', '==', userId).get()
        .then( querySnapshot =>
            querySnapshot.docs[0].data()
        )
        return result
    },
    getUserBySlug({state}, userSlug) {
        if(state.users.length > 0) {
            return state.users.find(user => user.slug == userSlug)
        }
        var docRef = db.collection('Users').doc(user.slug).get()
        .then(user =>
            user.data()
        )
        return docRef
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
