<template>
  <div
    class="imgprop"
    :style="{
      backgroundImage: 'url(/static/images/abotu.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'inherit',
    }"
  >
    <div class="serach">
      <div style="width: 500px">
        <el-input
          v-model.trim="input"
          placeholder="输入关键词"
          class="input-with-select"
          @keyup.enter.native="search"
        >
          <template #append>
            <el-button @click="search" :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
  </div>
  <div class="hotcontent" style="padding-top: 50px">
    <div class="listBox">
        <p>查询结果：</p>
      <ul v-for="(item, index) in list" :key="index" @click="goContent(item)">
        <li v-html="highlightText(item.title)"></li>
      </ul>
    </div>
    <pages
      v-model:page-num="pageObj.pageNum"
      :page-size="pageObj.pageSize"
      v-model:total="pageObj.total"
      @change="pageChange"
    ></pages>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElIcon, ElInput, ElButton } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import pages from "@/components/xhapage.vue";
import { get } from "../../utils/request";
import {getClassification} from "@/utils/package.js";

const props = defineProps(["articleId"]);
const input = ref("");
const list = ref([{ name: "海发" }, { name: "你好" }]);
const pageObj = reactive({
  pageNum: 1,
  pageSize: defPageSize,
  total: 0,
});
const defPageSize = 11;
const resultId1=ref('')
const resultId2=ref('')
console.log(props, "接收到的关键词");
const search = () => {
  query();
};
 let data = {
    "categoryId[0]":'1732647484279361537',
    "categoryId[1]":'1734058902870429698',
    params:{containSub:true},
    title: input.value,
    status: "publish",
    pageNum: 1,
    pageSize: defPageSize,
  };

  function goContent(item) {
  // location.href =
  //   `/articlepage.html?query=${item.id}` + `&topNav=${props.topNav}`;
  if(item.jumpurl){
    window.open(item.jumpurl)
  }else{
  window.open(`/articlepage.html?query=${item.id}` + `&topNav=${props.topNav}`)
  }
  // window.open(`/articlepage.html?query=${item.id}` + `&topNav=${props.topNav}`)

}
function query() {
 data.title=input.value
  get("/cms/article/list", data).then((res) => {
    list.value = res.rows;
    console.log("请求到的搜索", res);
    pageObj.total = res.total;
  });
}
function pageChange(pageObj) {
  console.log(pageObj);
  data.pageNum = parseInt(pageObj.pageNum);
  pageObj.pageNum = data.pageNum;
  query();
}

onMounted(() => {
  input.value = props.articleId;
  query();
  let dataId= JSON.parse(localStorage.getItem('Data'))
  const resultId1 = getClassification("partybuilding", dataId); 
  const resultId2 = getClassification("partybuilding", dataId); 
});
const highlightText = (text) => {
  if (input.value&&text) {
    let replaceReg = new RegExp(input.value, "g");
    let replaceString = '<span style="color: red;">' + input.value + "</span>";
    return text.replace(replaceReg, replaceString);
  } else {
    return text;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.imgprop {
  width: 100%;
  min-width: 1200px;
  height: 480px;
  margin-top: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    z-index: 2;
    color: #fff;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.hotcontent,
.serach {
  width: 1200px;


  margin: 0 auto;
  .listBox {
    width: 100%;
    color: #666;
    margin: 0 auto;
    >p{
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    > ul {
      border-bottom: 1px dashed #ddd;
      padding: 30px 10px;
      cursor: pointer;
      li{
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset !important;
}
:deep(.el-input-group__append, .el-input-group__prepend){
    background: #0c5cd6 !important;
}
:deep(.el-input-group__append){
    box-shadow: none;
}
:deep(.el-icon svg){
    color: #fff !important;
}
@media (max-width: 1440px) {
  .hotcontent {
    width: 1200px;
  }
}
</style>
