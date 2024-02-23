<template>
  <div>
    <div
      class="banner"
      :style="{ backgroundImage: 'url(' + bannerQuery.banner + ')' }"
    >
      <!-- 搜索框 -->
      <div class="searchs">
        <div class="flex-b">
          <van-search
            v-model="title"
            placeholder="请输入搜索关键词"
            @search="searchbtn"
            @cancel="onCancel"
          />
          <van-button type="primary" class="bttn" @click="searchbtn"
            >搜索</van-button
          >
        </div>
      </div>
    </div>
    <div class="search-box">
      <div class="boxone">查询结果：</div>
      <div
        v-if="list.length != 0"
        class="research"
        v-for="(item, index) in list"
        :key="item"
        v-html="highlightText(item.title)"
        @click="navtopage(item, index)"
      ></div>
      <van-empty v-else image="search" description="暂无相关数据" />
      <div class="paginations" v-if="list.length != 0">
        <van-pagination
          v-model="pageNum"
          :total-items="total"
          :items-per-page="pageSize"
          :show-page-size="4"
          force-ellipses
          @change="nexts"
        >
          <template #prev-text>
            <van-icon name="arrow-left" @click="nexts" />
          </template>
          <template #next-text>
            <van-icon name="arrow" @click="nexts" />
          </template>
        </van-pagination>
      </div>
    </div>
  </div>
</template>
<script setup name="contactUs">
import { Search, showToast } from "vant";
import banners from "../subpageHeader.vue";
import { ref, onMounted, reactive, watchEffect } from "vue";
import { get } from "@/utils/request.js";

const bannerQuery = reactive({
  banner: "/static/images/abotu.jpg", //banner图片
});
const title = ref("");
const list = ref([]);
const pageNum = ref(1); //当前页码
const pageSize = ref(20); //分页大小
const total = ref(10);
onMounted(async () => {
  getlist();
});

const getlist = async () => {
  let data = {
    "categoryId[0]": "1732647484279361537",
    "categoryId[1]": "1734058902870429698",
    params: { containSub: true },
    title: title.value,
    status: "publish",
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  };
  await get(`/cms/article/list`, data).then((res) => {
    list.value = res.rows;
    console.log(res);
    total.value = res.total;
  });
};

const searchbtn = (val) => {
  getlist();
};
const onCancel = (val) => {
  title.value = "";
};
const highlightText = (text) => {
  if (title.value && text) {
    let replaceReg = new RegExp(title.value, "g");
    let replaceString = '<span style="color: red;">' + title.value + "</span>";
    return text.replace(replaceReg, replaceString);
  } else {
    return text;
  }
};
const navtopage = (item) => {
  window.location.href = "./newsSubpage.html?id=" + `${item.id}`;
};
const nexts = () => {
  getlist();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
</script>
<style lang="scss">
* {
  cursor: pointer;
}

.banner {
  margin: 0 auto;
  color: #fff;
  text-align: center;
  padding: 60px 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .searchs {
    background: #fff;
    border-radius: 10px;

    .flex-b {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .van-search {
        background: none !important;
        width:100%;
      }
    }

    .bttn {
      white-space: nowrap;
      margin-right: 10px;
      width: 60px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      background-color: #0052af;
      color: #ffffff;
      text-align: center;
      border-radius: 5px;
    }
  }
}

.search-box {
  margin: 20px;
  font-size: 14px;

  .boxone {
    margin-bottom: 20px;
  }

  .research {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 0;
    border-bottom: 1px dashed #ddd;
  }

  .paginations {
    margin-top: 20px;
  }
}

.van-cell {
  background: none !important;
  border-bottom: none !important;
}

.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  font-size: 20px !important;
}

.van-field__control {
  font-size: 14px !important;
}
</style>
