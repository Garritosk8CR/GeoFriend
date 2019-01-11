import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/store'
import MainNavbar from '../src/layout/MainNavbar'
const MainFooter = () => import('../src/layout/MainFooter')
const Login = () => import('./views/Login.vue')
const Signup = () => import('./views/Signup.vue')
const GMap = () => import('./views/GlobalMap.vue')
const GChat = () => import('./views/GlobalChat.vue')
const Profile = () => import('./components/Profile/Profile.vue')
import Dashboard from './views/Dashboard.vue'
const Home = () => import('./views/Home.vue')

Vue.use(Router)


export default new Router({
    routes: [{
            path: '/login',
            components: {
                header: MainNavbar,
                default: Login,
                footer: MainFooter
            },
            name: 'login'
        },
        {
            path: '/signup',
            components: {
                header: MainNavbar,
                default: Signup,
                footer: MainFooter
            },
            name: 'signup'
        },
        {
            path: '/',
            components: {
                header: MainNavbar,
                default: Dashboard,
                footer: MainFooter
            },
            children: [{
                    path: '/gmap',
                    component: GMap,
                    name: 'gmap',
                    beforeEnter(to, from, next) {
                        if (Store.getters.isAuthenticated) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: '/profile',
                    component: Profile,
                    name: 'profile',
                    beforeEnter(to, from, next) {
                        if (Store.getters.isAuthenticated) {
                            if (Store.getters.userToShow) {
                                next()
                            } else {
                                next('/')
                            }
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: '/home',
                    component: Home,
                    name: 'home',
                    beforeEnter(to, from, next) {
                        if (Store.getters.isAuthenticated) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                },
                {
                    path: '/gchat',
                    component: GChat,
                    name: 'gchat',
                    beforeEnter(to, from, next) {
                        if (Store.getters.isAuthenticated) {
                            next()
                        } else {
                            next('/login')
                        }
                    }
                }
            ],
            name: 'dashboard',
            beforeEnter(to, from, next) {
                if (Store.getters.isAuthenticated) {
                    Store.dispatch('fetchUser').then(() => {
                            next()
                        })
                        .catch(error => {
                            next('/login')
                        })
                } else {
                    next('/login')
                }
            }
        }
    ],
    mode: 'history',
    scrollBehavior: to => {
        if (to.hash) {
            return {
                selector: to.hash
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
