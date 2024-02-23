<template>
  <div class="titleBox">
    <div class="bigTitle">{{ props.title }}</div>
    <div class="rectangle"></div>
  </div>
</template>

<script setup name="contactUs">
import {ref, onMounted} from "vue";

const props = defineProps({title: String})
const title = ref('')
onMounted(() => {
  title.value == props.title
});
</script>
<style scoped lang="scss">
.titleBox {
  padding: 20px 0 20px 0;

  .bigTitle {
    text-align: center;
    font-size: 20px;
    padding-bottom: 7px;
    font-family: Medium;
    color: #333;
    font-weight: bold;
  }

  .rectangle {
    margin: 0 auto;
    width: 30px;
    height: 0;
    border-top-color: #0c5cd6;
    border-top-width: 5px;
    border-top-style: solid;
    border-right: 6px solid rgba(0, 0, 0, 0);
  }
}
</style>
