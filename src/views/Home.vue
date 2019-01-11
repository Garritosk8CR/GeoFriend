<template>
    <v-layout align-center justify-center row fill-height wrap>
        <v-flex xs8 sm4 md3 align-self-center>
            <div class="item elevation-5"></div>
        </v-flex>
        <v-flex xs8 sm4 md3 align-self-center>
            <div class="item elevation-5"></div>
        </v-flex>
        <v-flex xs8 sm4 md3 align-self-center>
            <div class="item elevation-5"></div>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    components: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>
.resultContainer {
    height: 350px;
}

.item {
    min-height: 50px;
    min-width: 80px;

    width: 250px;
    height: 150px;
}
</style>
