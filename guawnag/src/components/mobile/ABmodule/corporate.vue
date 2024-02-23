<template>
  <div>
    <!-- <div v-for="item in list" :key="item" class="box">
      <van-image :src="item.src" />
      <div>{{ item.title }}</div>
      <p>{{ item.content }}</p>
    </div> -->
    <div class="culturee">
      <div class="culture-box" v-for="item in datalist" :key="item.id">
        <div class="culture-image">
          <img class="img" :src="item.img[0].url" alt=""/>
          <div class="mask">
            <div class="title">{{ item.title }}</div>
            <span
                v-html="item.content"
                style="text-align: center; margin: 0; padding: 0"
                class="data"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="contactUs">
import {ref, onMounted, defineProps} from "vue";
import {gettree, get} from "@/utils/request.js";

const props = defineProps(["cmpData"]);
const datalist = ref("");
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    datalist.value = res.rows;
  });
});
</script>
<style lang="scss">
p {
  margin: 0;
  padding: 0;
}

.culturee {
  padding: 0 20px 20px 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  .culture-box {
    margin-bottom: 20px;
    height: 300px;
    width: 100%;

    .culture-image {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      position: relative;
      margin-bottom: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        background-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0),
                #0c5cd6
        );
        padding-bottom: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        color: #fff;
        justify-content: flex-end;
        text-align: center;

        .title {
          font-size: 14px;
        }

        .data {
          font-weight: bold;
          font-size: 16px;
        }

        span {
          text-align: justify;
          line-height: 30px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
