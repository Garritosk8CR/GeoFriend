<template>
    <v-flex xs12 sm12 >
        <v-card color="white">
                <v-flex xs12>
                    <p class="title"> {{post.emitterUsername}} </p>
                    <v-divider></v-divider>
                </v-flex>
                <v-card-title primary-title>
                    <p class="subheadline">{{post.message}}</p>
                </v-card-title>
            </v-layout>
        </v-card>
    </v-flex>
</template>

<script>


export default {
    data() {
        return {

        }
    },
    props: [
        'post'
    ]
}

</script>

<style scoped>

</style>
