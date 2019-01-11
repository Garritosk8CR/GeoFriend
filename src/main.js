/* eslint-disable */
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import VueChatScroll from 'vue-chat-scroll'
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueChatScroll)

var vueapp = null;
firebase.auth().onAuthStateChanged( () => {
    if(!vueapp) {
        vueapp = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})


