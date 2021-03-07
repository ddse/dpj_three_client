<template>
  <vx-card title="Theme Snow" code-toggler>
    <p class="mb-5">Snow is a clean, flat toolbar theme</p>
    <quill-editor v-model="content"></quill-editor>

    <!-- <prism class="rounded-lg"> {{ content }} </prism> -->
  </vx-card>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
// import Prism from 'vue-prism-component'

export default {
  props: {
    content: {
      require: true,
      typeof: String,
    },
  },
  data() {
    return {};
  },
  components: {
    quillEditor,
    // Prism
  },
};
</script>