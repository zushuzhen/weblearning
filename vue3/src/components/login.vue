<template>
  <div  class="background">
    1234567890    21312
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
onMounted(()=>{

})
const account = ref('')
const password = ref('')

</script>
<style lang="scss">
//.background {
//  background-image:url('../assets/image/xingkong.jpg');
//  background-repeat: no-repeat;
//  background-position: center top;
//  background-size: auto  ;
//  width: 100vw;
//  height: 100vh;
//
//}
.background {
  background-image:url('../assets/image/38402160.jpg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size:100vw 100vh;
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
  background: rgb(0,0,0,0.3);
}

.felxStart {
  color: #fff;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>



























