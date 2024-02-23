<template>
  <div class="groupPlate">
    <div v-for="(item, index) in dataA" :key="index">
      <h3 class="yeardata"
          v-if="dataA.length > 0 && dataA[(index == 0 ? 1 : index) - 1].name == item.name? false: true">
        {{ item.name }}
      </h3>
      <h3 class="yeardata" v-else-if="index == 0">{{ item.name }}</h3>
      <div class="list" v-for="(ite, ind) in  item.article" :key="ind">
        <div class="year">{{ ite.title }}</div>
        <div class="content">
          <div v-html="ite.content" class="textdata"></div>
          <div class="imagebox">
            <van-image v-for="it in ite.img" :key="it" width="100%" fit="cover" position="centers" :src="it.url"
                       class="image"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="groupPlate">
import {ref, onMounted, defineProps} from "vue";
import {gettree, get} from "@/utils/request.js";

const navList = ref([]);
const props = defineProps(["cmpData"]);
const dataA = ref("");
const categoryId = ref();
const articles = ref([])
onMounted(() => {
  gettree(props.cmpData.id, false).then((res) => {
    categoryId.value = res.data[0].id;
    navList.value = res.data
  });
  let data = {
    categoryId: props.cmpData.id,
    status: "publish", params: {containSub: true,},
  };
  get("/cms/article/list", data).then((res) => {
    if (res.rows && res.rows.length > 0) {
      articles.value = res.rows;
    }
    articles.value.forEach((article) => {
      navList.value.forEach((nav) => {
        if (article.categoryId && article.categoryId.includes(nav.id)) {
          if (nav.article) {
            nav.article.push(article);
          } else {
            nav.article = [article];
          }
        }
      });
    });
    dataA.value = navList.value.map((item) => {
      return {
        ...item,
        article: item.article.map(ite => {
          return {
            ...ite,
            year: extractYear(ite.content),
          }
        })
      };
    });
  });
});

//提取出年
function extractYear(text) {
  const yearRegex = /(\d{4})[\s年]/;
  const match = text.match(yearRegex);
  return match ? match[1] : null;
}
</script>
<style scoped lang="scss">
.groupPlate {
  padding: 0 20px;

  .yeardata {
    color: #0c5cd6;
    text-align: center;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin-bottom: 10px;

    .year {
      width: 30px;
      color: #0c5cd6;
      padding-right: 15px;
      font-size: 18px;
      white-space: nowrap;
    }

    .content {


      .textdata {
        margin: 0 !important;
        padding: 0 !important;
        font-size: 14px;
        line-height: 28px;

        p {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 14px;
          line-height: 28px;
        }

        .ql-align-justify {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 14px;
          line-height: 28px;
        }
      }

      .imagebox {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;

        .image {
          padding-top: 10px;
          height: 100px;
        }
      }
    }
  }
}
</style>
