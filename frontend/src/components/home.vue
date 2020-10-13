<template>
  <div class="container-fluid">
    <div class="row jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4" style="font-weight: bold;">한국인은 밥심!</h1>
      </div>
    </div>
    <div class="row" style="height:120px;">
      <div class="col-4" style="background-color: red;"></div>
      <div class="col-4" style="background-color: blue;"></div>
      <div class="col-4" style="background-color: green;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
