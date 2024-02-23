<template>
  <div class="background">
    <div class="center">
      <div class="felxStart">
        <div>账号：</div>
        <el-input v-model="account" placeholder="请输入账号(admin)"/>
      </div>
      <div class="felxStart" style="margin: 20px 0">
        <div>密码：</div>
        <el-input v-model="password" type="password" placeholder="请输入密码(admin)"/>
      </div>
      <el-button type="primary" style="width: 100%" @click="">登录</el-button>
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted} from "vue";
import $bus from "@/utils/bus.js";
// const props = defineProps(["modelValue", "navList", "modelStyle", "showTitle"]);
// const emit = defineEmits(["update:modelValue"]);
const account = ref('')
const password = ref('')
const urlHash = ref("");//网络路径
onMounted(() => {
  urlHash.value = window.location.hash.replace("#", "");
  console.log(urlHash.value)
  //接收数据
  // $bus.on("subactive", (val) => {
  //   subactive.value = val.subactive;
  // });
});
const onClickTab = (res) => {
  if (res.title == "招采信息") {
    window.location.href = 'https://app.51qqt.com/qingdaotourism/portal/#/login'
  } else {
    navList.value.map((item, index) => {
      if (index == subactive.value) {
        emit("update:modelValue", item);
        if (item.url) {
          window.location.href = `${item?.url}`;
        }
      }
    });
  }
};
</script>
<!--.background {-->
<!--background-image:url('../assets/image/xingkong.jpg');-->
<!--background-repeat: no-repeat;-->
<!--background-position: center top;-->
<!--background-size: auto  ;-->
<!--width: 100vw;-->
<!--height: 100vh;-->
<!--}-->

<!--background-image:url('../assets/image/38402160.jpg');-->
<style lang="scss">

.background {

  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100vw 100vh;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
}

.center {
  width: 300px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 50px 30px;
  border-radius: 10px;
  border: 1px solid #f7f7f7;
  background: rgb(0, 0, 0, 0.3);
}

.felxStart {
  color: #fff;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

