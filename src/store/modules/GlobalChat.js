import db, {getTimestamp} from '@/db'
import {newGlobalMessage} from './Models/Message'
import moment from 'moment'
const state = {
    globalMessages: [

    ],
    listen: false,
    areMessagesLoaded: false
}

const getters = {
    globalMessages(state) {
        return state.globalMessages
    },
    areMessagesLoaded(state) {
        return state.areMessagesLoaded
    },
    listen(state) {
        return state.listen
    }
}

const mutations = {
    addGlobalMessage(state, globalMessage) {
        state.globalMessages.push(globalMessage)
    },
    addGlobalMessages(state, globalMessages) {
        state.globalMessages = globalMessages
    },
    setAreMessagesLoaded(state, areLoaded) {
        state.areMessagesLoaded = areLoaded
    },
    setListen(state, islistening) {
        state.listen = islistening
    }
}

const actions = {
    fetchGlobalMessages({commit}) {
        db.collection('GlobalMessages').orderBy('timestamp').get()
        .then( querySnapshot => {
            var map = Array.prototype.map
            var globalMessages = map.call(querySnapshot.docs, globalMessage => {
                var gMessage = globalMessage.data()
                gMessage.timestamp = moment(gMessage.timestamp).format('lll')
                return gMessage
            })
            if(globalMessages.length > 0) {
                globalMessages.forEach(message => commit('addGlobalMessage',message))
                commit('setAreMessagesLoaded', true)
            }
        })
        .catch(error => console.log(error))
    },
    addNewGlobalMessage({getters,commit}, message) {
        var user = getters.user
        var params = {
            user,
            message,
            timestamp: Date.now()
        }
        var globalMessage = newGlobalMessage(params)
        db.collection('GlobalMessages').add(globalMessage)
    },
    listenForNewMessages({commit, state, dispatch}) {
        if(!state.listen) {
            db.collection('GlobalMessages').orderBy('timestamp').onSnapshot( snapshot => {
                var changes = snapshot.docChanges()
                var map = Array.prototype.map
                var messages = map.call(changes, change => {
                    if(change.type == 'added') {
                        var formatedMessage = change.doc.data()
                        formatedMessage.timestamp =  moment(formatedMessage.timestamp).format('lll')
                        return {
                            id: change.doc.id,
                            ...formatedMessage
                        }
                    }
                })
                messages.forEach(message => commit('addGlobalMessage',message))
                commit('setAreMessagesLoaded', true)
                commit('setListen', true)
            })
        }
    },
    resetGlobalChat({commit, state}) {
        state.globalMessages.length = 0
        commit('setAreMessagesLoaded', false)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
