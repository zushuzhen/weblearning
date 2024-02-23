<template>
  <div class="team-box">
    <div v-for="(item, index) in list" :key="index" class="team">
      <div class="leader">
        <div class="team-name">{{ item.title }}</div>
        <div class="position">{{ item.summary }}</div>
      </div>
    </div>
  </div>
</template>
<script setup name="managerteam">
import { ref, onMounted, defineProps } from "vue";
import { get } from "@/utils/request.js";
const props = defineProps(["cmpData"]);
const dataA = ref("");
const list=ref([])
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    list.value = res.rows;
  });
});
</script>
<style scoped lang="scss">
* {
  font-family: Regular;
}

.team-box {
  padding: 0 20px;

  .team {
    height: 200rpx;
    width: 330rpx;
    background: #f6f7f9;
    margin-bottom: 20px;

    .leader {
      padding: 30px 30px;
    }

    .team-name {
      font-weight: bold;
      padding-bottom: 12px;
      font-size: 20px;
      font-family: Medium;
    }

    .position {
      font-size: 14px;
      color: #666;
      line-height: 20px;
    }
  }
}
</style>
