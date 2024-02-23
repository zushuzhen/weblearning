<template>
  <div class="greetings">
    <el-select v-model="kindvalue" clearable class="m-2" placeholder="Select" style="width: 240px">
      <el-option v-for="item in kinds" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" @click="search">查询</el-button>
    <el-button type="primary" @click="add">新增</el-button>
    <div>
      <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from 'vue'

const textarea = ref('')//介绍
const kindvalue = ref('')//选择
const kinds = [
  {
    value: '音像制品类',
    label: '音像制品类'
  },
  {
    value: '文件类',
    label: '文件类'
  },
  {
    value: '放映介质',
    label: '放映介质'
  },
  {
    value: '窜传品类',
    label: '窜传品类'
  }
]//选择类别
const addshow = ref(false)
//搜索
const search = () => {

}
// 增加
const add = () => {
  addshow.value = true
}

</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
