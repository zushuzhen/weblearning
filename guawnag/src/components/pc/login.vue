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
      <el-button type="primary" style="width: 100%" @click="Login">登录</el-button>
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
const Login = (res) => {
  if (account.value == 'admin') {
    ElMessage({message: '账号不存在或账号错误！', type: 'warning',})
    return
  }
  if (password.value == 'admin') {
    ElMessage({message: '密码错误！', type: 'warning',})
    return
  }
  ElMessage({message: '登录成功', type: 'success',})
  localStorage.setItem('token', '123456789');
  setTimeout(() => {
    window.location.href = './index.html'
  }, 1000) // 延迟1000毫秒执行
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

