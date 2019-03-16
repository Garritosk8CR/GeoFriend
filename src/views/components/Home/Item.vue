<template>
    <div :class="divClass + pColor" :style="{'height': '100%', 'padding-top': '9%'}">
        <v-icon :color="iconColor" size="100">{{pIcon}}</v-icon>
        <h6 class="headline " :style="{'color': grey}">{{pHeadline}}</h6>
    </div>
</template>

<script>
export default {
    props: [
        'pIcon',
        'pHeadline',
        'pColor'
    ],
    data: () => ({
        divClass: 'item elevation-5 text-center ',
        iconColor: 'grey lighten-2',
        grey: '#E0E0E0'
    })
}
</script>

<style>

</style>
