<template>
  <div class="container-fluid">
    <div class="row jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4" style="font-weight: bold;">한국인은 밥심!</h1>
      </div>
    </div>
    <div class="border border-light  p-3 mb-4 text-center">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary active">
          <input type="radio" name="options" id="option1" checked> 아침
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option2"> 점심
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option3"> 저녁
        </label>
      </div>
      <button type="button" class="btn btn-primary" onclick="sm.action()">돌려돌려!</button>
    </div>
    <div class="border border-light  p-3 mb-4 text-center">
      <div id="sm">
        <div class="group">
          <div class="reel"></div>
          <div class="reel"></div>
          <div class="reel"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'roulelett',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
