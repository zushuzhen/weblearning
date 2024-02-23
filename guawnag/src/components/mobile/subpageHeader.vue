<template>
  <div>
    <div
        class="banner"
        :style="{
        backgroundImage: 'url(' + bannerQuery.banner + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }"
    >
      <h1>{{ bannerQuery.title }}</h1>
      <div class="small-title">{{ bannerQuery.wasp }}</div>
      <van-image
          src="static/images/downward.jpg"
          fit="cover"
          position="center"
          class="icon"
      />
    </div>
  </div>
</template>
<script setup name="contactUs">
import {ref, onMounted,defineProps} from "vue";

const bannerQuery = ref({});
const props = defineProps(["bannerQuery"]);
onMounted(() => {

  bannerQuery.value = props.bannerQuery;

  console.log( bannerQuery.value)
});
</script>
<style lang="scss">
.banner {
  margin: 0 auto;
  color: #fff;
  text-align: center;
  padding: 30px;

  h1 {
    font-family: Medium;
    margin: 0 auto;
    padding-top: 12px;
    font-size: 24px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
  }

  .small-title {
    margin: 10px auto;
    font-size: 14px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
  }

  .icon {
    width: 10px;
    animation: dong 1s infinite;
  }
}

@keyframes dong {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, 4px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
