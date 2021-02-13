<template>
  <Viewer v-if="viewerText.length > 0"
          ref="toastViewer"
          :initialValue="viewerText"
          @load="onEditorLoad"
          @focus="onEditorFocus"
          @blur="onEditorBlur"
          @change="onEditorChange"
          @stateChange="onEditorStateChange"
  />
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import {Viewer} from '@toast-ui/vue-editor';

export default {
  data() {
    return {
      viewerText: ''
    }
  },
  methods: {
    onEditorLoad() {
      // implement your code
    },
    onEditorFocus() {
      // implement your code
    },
    onEditorBlur() {
      // implement your code
    },
    onEditorChange() {
      // implement your code
    },
    onEditorStateChange() {
      // implement your code
    },
  },
  mounted() { // 어디선가 저장된 데이터를 호출
    // fetch("주소").then(response => {
    //   if (response.ok) {
    //     return response.json();
    //   } else {
    //     throw response;
    //   }
    // }).then(data => {
    //   this.content = data;
    // });
  },
  components: {
    viewer: Viewer
  },
};
</script>
<!--ref : https://github.com/nhn/tui.editor/tree/master/apps/vue-editor#-editor-usage-->
