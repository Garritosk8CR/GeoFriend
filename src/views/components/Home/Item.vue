<template>
    <div :class="divClass + pColor" @click="goTo">
        <v-icon :color="iconColor" size="100">{{pIcon}}</v-icon>
        <h6 class="headline " :style="{'color': grey}">{{pHeadline}}</h6>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    props: [
        'pIcon',
        'pHeadline',
        'pColor',
        'prouteName',
        'p_isProfile'
    ],
    data: () => ({
        divClass: 'item elevation-5 text-center ',
        iconColor: 'grey lighten-2',
        grey: '#E0E0E0'
    }),
    methods: {
        ...mapActions([
            'getUserById'
        ]),
        ...mapMutations([
            'setUserToShow'
        ]),
        goTo() {
            if(this.p_isProfile) {
                this.getUserById(this.getLogedUser.id).then(user => {
                    this.setUserToShow(user)
                    this.$router.push({name: 'profile'})
                })
            } else {
                this.$router.push({name: this.prouteName})
            }
        }
    },
    computed: {
        ...mapGetters([
            'user',
            'getLogedUser',
            'getUserId'
        ]),
    }
}
</script>

<style>

</style>
