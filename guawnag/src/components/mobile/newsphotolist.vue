<template>
  <div>
    <div class="newsphotolist-box" v-if="list.length != 0">
      <div v-for="(item, index) in list" :key="index" @click="navtopage(item)">
        <div class="flex">
          <van-image v-if="item && item.img && item.img.length != 0" fit="cover" :src="item.img[0]?.url"
                     class="new-img"/>
          <van-image v-else src="/static/images/defalut.png" class="new-img"/>
          <div class="box">
            <div class="titlee">{{ item.title }}</div>
            <div class="texts">{{
                (item.summary != "\t\t\t\t\t\r\n\t\t\t\t") && item.summary ? item.summary : '筑梦想，赢未来'
              }}
            </div>
            <div class="flex-center">
              <van-tag class="tag-news" v-if="item.tags.length > 0">{{ gettages(item.tags[0]) }}</van-tag>
              <!--              <van-tag class="tag-news">{{ "热点新闻" }}</van-tag>-->
              <div style="text-align: left;color:#666">
                {{ formatDate(item.publishtime, "all") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="pressCenter">
import {reactive, ref, defineProps, onMounted, watchEffect} from "vue";
import {formatDate} from "@/utils/time.js";
import {gettree, get} from "@/utils/request.js";
import {gettages} from "@/utils/tags.js";
const list = ref([]);
const props = defineProps(["list"]);
//获取标签
const getcms = () => {
  get("/system/dict/data/type/cms_article_tags").then((res) => {
    localStorage.setItem("cms", JSON.stringify(res.data));
  });
};
onMounted(async () => {
  getcms()
});
watchEffect(() => {
  if (props?.list) {
    list.value = props.list;
  }
});
const navtopage = (item) => {
  window.location.href = './newsSubpage.html?id=' + `${item.id}`
}

</script>
<style scoped lang="scss">
.newsphotolist-box {
  padding: 0 20px 20px 20px;
}

.flex {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .new-img {
    border-radius: 5%;
    height: 90px;
    width: 30vw;
    margin-right: 10px;
  }

  .box {
    width: 50vw;

    .titlee {
      text-align: left;
      font-family: Medium;
      color: #333;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 6px;
    }

    .texts {
      color: #666;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      margin-bottom: 10px;
    }

    .flex-center {
      font-size: 14px;
      display: flex;
      align-items: center;

      .tag-news {
        background: #f3f3f3;
        color: #0c5cd6;
        font-weight: 400;
        font-size: 12px;
        padding: 5px;
        margin-right: 15px;
      }
    }
  }
}
</style>
