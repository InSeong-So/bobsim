<template>
  <div id="app">
    <div class="w3-top">
      <div class="w3-row w3-padding w3-black">
        <div class="w3-col s2">
          <a href="#" class="w3-button w3-block w3-black">HOME</a>
        </div>
        <div class="w3-col s2">
          <a href="#about" class="w3-button w3-block w3-black">ABOUT</a>
        </div>
        <div class="w3-col s2">
          <a href="#recommended" class="w3-button w3-block w3-black">RECOMMENDED</a>
        </div>
        <div class="w3-col s2">
          <a href="#where" class="w3-button w3-block w3-black">RECORD</a>
        </div>
        <div class="w3-col s2">
          <a href="#where" class="w3-button w3-block w3-black">WHERE</a>
        </div>
        <div class="w3-col s2">
          <a href="#inc" class="w3-button w3-block w3-black">CONTACT</a>
        </div>
<!--        <div class="w3-col s2">-->
<!--          <a href="#mypage" class="w3-button w3-block w3-black">MY PAGE</a>-->
<!--        </div>-->
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {
      // TODO
    },
    methods: {
      // TODO
    },
  }
</script>

<style>
</style>
