<template>
  <div class="w3-sand w3-large">
    <div class="w3-container">
      <div class="w3-content" style="max-width:700px; min-height: 500px;">
        <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">ABOUT : THE BOBSIM!</span></h5>
        <p>한국인은 밥심으로 산다고 했습니다.</p>
        <p>바쁜 일상 속 무엇을 먹을지 고민하다 시간이 지체되거나,</p>
        <p>의견을 통일하지 못해 구내식당을 이용하는 당신에게 맞춤 메뉴를 추천합니다!</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><strong>"어떤 가게를 가지?!"</strong></p>
          <p><i>"디저트? 저녁? 회식?" 원하는 시간별로, 식사별로 주변의 음식점과 메뉴를 확인하세요!</i></p>
        </div>
        <p><span class="w3-tag"><strong>회원이시라면</strong></span> : 자신만의 리스트 만들기; 리뷰와 평점으로 맞춤형 리스트 제공;</p>
        <!--        <p><span class="w3-tag"><strong>비회원이라도 : </strong></span> 원하는 지역의 식사별 맛집 추천 받기; 새로운 맛집 등록하기;</p>-->
        <p><strong>비회원이라도</strong> : 원하는 지역의 식사별 맛집 추천 받기; 새로운 맛집 등록하기;</p>
      </div>
    </div>

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:700px;  min-height: 500px;">
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

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:700px;  min-height: 500px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">SHARE OR RECORD YOUR RESTAURANT</span></h5>
        <p>자신만의 맛집을 등록하거나, 공유하세요!</p>
        <p><span class="w3-tag">잠깐!</span> 밥심에서는 개인정보를 필요로 하지 않습니다.</p>
        <p>순수한 맛집 리스트, 맛있는 식사 코스 등을 등록하고 공유할 수 있습니다.</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i><strong>자신만의 리스트를 만들고 평점과 리뷰를 작성한 뒤 친구들과 공유하세요!</strong></i></p>
        </div>
      </div>
    </div>

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:700px;  min-height: 500px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">PLANNING YOUR MEAL</span></h5>
        <p>직장 동료, 학원 동기, 친구들과의 식사표를 만들어보세요!</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i><strong>이력을 남기거나, 정해진 기간의 식사표를 확인하고 최적의 맛집으로 안내해드립니다!</strong></i></p>
        </div>
      </div>
    </div>

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:700px; min-height: 500px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">TO DIET!</span></h5>
        <p>운동량이 부족해서 살이 찌거나, 건강이 나빠진다면?</p>
        <p>밥심이 추천하는 다이어트 식단표를 참고하세요!</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i><strong>칼로리와 영양소를 챙겨줍니다!</strong></i></p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'bobsimHome',
  data() {
    return {
      dialog: false,
    }
  },
  methods: {},
  created() {
    // this.$http.getAuthToken().then(resolve => {
    //   console.log(resolve);
    // });
  },
  mounted() {
  },
  components: {},
}
</script>
