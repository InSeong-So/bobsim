<template>
  <editor ref="toastEditor"
          v-model="editorText"
          :initialValue="editorText"
          :options="editorOptions"
          height="200px"
          initialEditType="wysiwyg"
          previewStyle="vertical"
          @load="onEditorLoad"
          @focus="onEditorFocus"
          @blur="onEditorBlur"
          @change="onEditorChange"
          @stateChange="onEditorStateChange"
  />
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/vue-editor/dist/toastui-vue-editor';
import 'codemirror/lib/codemirror.css';
import {Editor} from '@toast-ui/vue-editor'

export default {
  data() {
    return {
      editorText: '',
      editorOptions: {
        hideModeSwitch: true
      }
    }
  },
  methods: {
    scroll() {
      this.$refs.toastEditor.invoke('scrollTop', 10);
    },
    moveTop() {
      this.$refs.toastEditor.invoke('moveCursorToStart');
    },
    getHtml() {
      let html = this.$refs.toastEditor.invoke('getHtml');
    },
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
    }
  },
  mounted() {
  },
  components: {
    'editor': Editor
  }
}
</script>
<!--ref : https://github.com/nhn/tui.editor/tree/master/apps/vue-editor#-editor-usage-->
