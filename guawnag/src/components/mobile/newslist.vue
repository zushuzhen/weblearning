<template>
  <div class="newlist" v-if="list.length != 0">
    <div class="body" v-for="(item, index) in list" :key="index" @click="navtopage(item, index)">
      <van-image v-if="item?.img && item.img.length != 0" :src="item?.img[0]?.url" class="swipe-image" fit="cover"
                 position="center"/>
      <van-image v-else src="/static/images/defalut.png" class="swipe-image" fit="cover" position="center"/>
      <div class="tag-news">
        <div class="content-news">{{ item.title }}</div>
        <div class="small-title">
          {{ (item.summary != "\t\t\t\t\t\r\n\t\t\t\t") && item.summary ? item.summary : '筑梦想，赢未来' }}
        </div>
        <div class="flex-starts">
          <van-tag class="tag" v-if="item.tags && item.tags.length > 0">{{ gettages(item.tags[0]) }}</van-tag>
          <div class="time">{{ formatDate(item.publishtime, "all") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="newlist">
import {reactive, ref, defineProps, onMounted, watch} from "vue";
import {formatDate} from "@/utils/time.js";
import $bus from "@/utils/bus.js";
import {gettages} from "@/utils/tags.js";
import {gettree, get} from "@/utils/request.js";

const list = ref([
  {
    id: "",
    img: [],
    title: "",
    content: "",
    publishtime: "",
  },
]);
const navtopage = (item) => {
  window.location.href = "./newsSubpage.html?id=" + `${item.id}`;
};
//获取标签
const getcms = () => {
  get("/system/dict/data/type/cms_article_tags").then((res) => {
    localStorage.setItem("cms", JSON.stringify(res.data));
  });
};
const props = defineProps(["list"]);
onMounted(async () => {
  getcms()
});
watch(() => {
  if (props.list) {
    list.value = props.list;
  }
  return props.list
}, () => {
});

</script>
<style scoped lang="scss">
.newlist {
  margin: 0 20px 20px 20px;
  background-size: 100% 100%;
  box-sizing: border-box;
  .body {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 0.1px solid #ddd;

    .swipe-image {
      font-size: 0 !important;
      display: block !important;
      width: 100%;
      height: 50vw;
    }

    .tag-news {
      font-size: 16px;

      .content-news {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 10px 0 5px 0;
        font-size: 16px;
        font-weight: 700;
        font-family: Medium;
        color: #333;
      }

      .small-title {
        color: #666;
        text-align: left;
        font-size: 14px;
        line-height: 25px;
        margin-bottom: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
      }

      .flex-starts {
        align-items: center;
        display: flex;

        .tag {
          text-align: center;
          background: #f3f3f3;
          color: #0c5cd6;
          font-size: 12px;
          padding: 3px 5px;
          margin-right: 15px;
        }

        .time {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>
