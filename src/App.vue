<template>
    <v-app>
        <router-view name="header" />
        <v-content>
                <router-view></router-view>
        </v-content>
        <router-view name="footer" />
    </v-app>
</template>

<script>

export default {
  components: {

  },
  data: () => ({
  }),
  props: {
    source: String
  },
  methods: {

  }
}
</script>
