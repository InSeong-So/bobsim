<template>
  <v-dialog
    v-model="progressDialog"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      color="primary"
      dark
    >
      <v-card-text>
        잠시만 기다려주세요...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: [
    "progressDialog"
  ],
  data() {
    return {
      childProgress: this.progressDialog
    }
  },
  watch: {
    progressDialog(val) {
      if (!val) return;
      this.$emit('progressDialog', this.childProgress)
    }
  }
}
</script>
