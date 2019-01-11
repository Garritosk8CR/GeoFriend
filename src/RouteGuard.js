export default {
    beforeEnter(to, from, next) {
        if(Store.getters.isAuthenticated) {
            next()
        } else {
            next('/login')
        }
    }
}
