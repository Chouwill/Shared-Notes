<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import Editor from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style

  const editorRef = ref(null);
  const editor = ref(null);

  onMounted(() => {
    console.log(editorRef.value);
    editor.value = new Editor({
      // el: document.querySelector("#editor"),
      el: editorRef.value,
      height: "500px",
      initialEditType: "markdown",
      previewStyle: "vertical",
    });
    editor.value.getMarkdown();
  });
  </script>

  <template>
    <div ref="editorRef"></div>
  </template>

  <style scoped></style>
