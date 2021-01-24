<template>
  <v-app>
    <hr/>

    <v-footer
      dark
      height="auto"
    >
      <v-card
        flat
        tile
        class="white--text text-xs-center"
        style="width:100%"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-3 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text">
          &copy;2018 — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'bobsimFooter',
  data() {
    return {
      icons: [
        'fab fa-github',
        'fab fa-google-plus',
        'fab fa-linkedin',
      ],
    }
  },
}
</script>
