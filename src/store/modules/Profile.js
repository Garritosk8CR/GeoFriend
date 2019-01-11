import db from '@/db'
import newPost from './Models/Post'
const state = {
    userToShow: null,
    posts: [
        {
            message: 'no posts yet...',
            emitterUsername: '',
            emitterId: '',
            id: '',
            userId: ''
        }
    ]
}

const getters = {
    userToShow(state) {
        return state.userToShow
    },
    posts(state) {
        return state.posts
    }
}

const mutations = {
    setUserToShow(state, userToShow) {
        state.userToShow = userToShow
    },
    addPost(state, post) {
        state.posts.push(post)
    },
    addPosts(state, posts) {
        state.posts = posts
    }
}

const actions = {
    fetchUserPosts({commit, getters}) {
        db.collection('Posts').where('userId', '==', getters.userToShow.slug).get()
        .then( querySnapshot => {
            var map = Array.prototype.map
            var currentPosts = map.call(querySnapshot.docs, post => {
               return post.data()
            })
            if(currentPosts.length > 0) {
                commit('addPosts', currentPosts)
            } else {
                commit('addPosts', [{
                    message: 'no posts yet...',
                    emitterUsername: '',
                    emitterId: '',
                    id: '',
                    userId: ''
                }])
            }

        })
        .catch(error => console.log(error))
    },
    addNewPost({commit}, payload) {
        var post = newPost(payload)
        db.collection('Posts').add(post).then(() => {
            commit('addPost', post)
        })

        .catch(error => console.log(error))
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
