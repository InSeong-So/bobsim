<template>
  <div class="w3-sand w3-large">
    <div class="w3-container" id="recommended">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">THE RECOMMENDED</span></h5>
        <div class="w3-row w3-center w3-card w3-padding">
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark>아침</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark>점심</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark>저녁</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark>디저트</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark>야식</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark>술</v-btn>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'bobsimMypage',
  data() {
    return {
      progressDialog: false,
    }
  },
  methods: {},
  created() {
  },
  mounted() {
  },
  components: {
  },
}
</script>
