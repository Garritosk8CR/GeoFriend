import * as firebase from 'firebase'
import Router from '@/router'


const state = {
    idToken: null,
    userId: null,
    logedUser: null,
    feedback: false,
    authError: null
}

const getters = {
    isAuthenticated (state) {
        return state.logedUser !== null && state.logedUser !== undefined
    },
    getFeedback(state) {
        return state.feedback
    },
    getLogedUser(state) {
        return state.logedUser
    },
    authError(state) {
        return state.authError
    },
    getUserId(state) {
        return state.userId
    }
}

const mutations = {
    authUser(state, userData) {
        state.idToken = userData.token
        state.userId = userData.userId
    },
    clearAuthData(state, val = null) {
        // state.idToken = null
        // state.userId = null
        state.logedUser = null

    },
    setLogedUser(state, logedUser) {
        state.logedUser = logedUser
    },
    setFeedback(state, message) {
        state.feedback = message
    },
    setAuthError(state, message) {
        state.authError = message
    },
    clearError(state, emptyVal) {
        state.authError = emptyVal
    }
}

const actions = {
    signup({commit, dispatch}, authData) {

        firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
        .then( payload => {
            const newUser = {
                id: payload.user.uid,
                ...authData
            }
            commit('clearError', null)
            commit('setLogedUser', {...newUser, ...payload.user})
            dispatch('storeUser', newUser)
        })
        .catch(error => {

            console.log(error)
            commit('setAuthError', error.message)
        })

    },
    login({ commit, dispatch }, authData) {

        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
        .then( payload => {
            const logedUser = {
                id: payload.user.uid,
                email: authData.email
            }
            commit('clearError', null)
            commit('setLogedUser', { ...logedUser, ...payload.user })
            Router.push({name: 'dashboard'})

        })
        .catch(error => {

            console.log(error)
            commit('setAuthError', error.message)
        })
    },
    logout({commit}) {
        firebase.auth().signOut()
        .then( res => {
            commit('clearAuthData')
            Router.replace({name: 'login'})
        })

    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
