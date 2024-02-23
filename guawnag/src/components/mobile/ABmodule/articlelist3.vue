<template>
  <div class="recruitment">
    <div class="recruitments">
      <van-field v-model="fieldValue" is-link readonly placeholder="选择"
                 @click="showPicker = true"/>
    </div>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          :columns="poptablist"
          @cancel="showPicker = false"
          @confirm="subClickTab"
      />
    </van-popup>
    <div v-if="list.length>0" v-for="item in list" key="item" class="cell-recruit flex-between">
      <div class="left">
        <div class="flex-start toptitle">
          <div class="position">{{ item.title }}</div>
          <van-tag class="tag" v-if="item.tags && item.tags.length > 0">{{ gettages(item.tags[0]) }}</van-tag>
        </div>
        <div class="flex-start bottomtitle">
          <span>{{ '青岛旅游集团' }}</span>
          <div style="padding: 0 10px;">|</div>
          <span>{{ '市南区' }}</span>
        </div>
      </div>
      <div class="right">⇀</div>
    </div>
    <van-empty v-else image="search" description="暂无相关数据" />
    <van-pagination
        v-if="list.length>0"
        v-model="pageNum"
        :total-items="total"
        :items-per-page="pageSize"
        :show-page-size="4"
        force-ellipses
        @change="nexts"
    >
      <template #prev-text>
        <van-icon name="arrow-left" @click="nexts"/>
      </template>
      <template #next-text>
        <van-icon name="arrow" @click="nexts"/>
      </template>
    </van-pagination>
  </div>
</template>

<script setup name="recruitment">
import {gettree, get} from "@/utils/request.js";
import {ref, onMounted, defineProps, watch, nextTick} from "vue";
import {gettages} from "@/utils/tags.js";
const props = defineProps(["cmpData"]);
const list = ref([]);
const pageNum = ref(1); //当前页码
const pageSize = ref(10); //分页大小
const total = ref(10);

const fieldValue = ref('')
const showPicker = ref(false)
const poptablist = ref([])
onMounted(() => {
  let id = props.cmpData.children[0].id
  fieldValue.value = props.cmpData.children[0].name
  poptablist.value = props.cmpData.children.map(item => {
    return {
      text: item.name,
      value: item.id
    }
  })
  getlist(id);
});
const getlist = async (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  };
  await get(`/cms/article/list`, data).then((res) => {
    list.value = res.rows;
    console.log(res)
    total.value = res.total;
  });
};
//跳转详情页
const nexts = () => {
  console.log(pageNum.value);
  getlist();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
// 弹窗点击事件
const subClickTab = (val) => {
  console.log(val.selectedOptions[0])
  fieldValue.value= val.selectedOptions[0].text
  getlist(val.selectedOptions[0].value);
  showPicker.value=false
}

</script>
<style scoped lang="scss">
.recruitment {
  padding: 0 20px;
  padding-bottom: 20px;

  .recruitments {
    padding-bottom: 20px;
    .van-cell {
      color: hsla(0, 0%, 100%, 0.6) !important;
      background: #fff !important;
      border: 1px solid #eee !important;
      position: static !important;
    }

    .van-cell {
      display: flex;
      align-items: center;
    }
  }

  .cell-recruit {
    border-radius: 5px;
    background: #F7F7F7;
    margin-bottom: 10px;
    padding: 10px;

    .left {
      .toptitle {
        margin-bottom: 10px;

        .position {
          font-size: 16px;
          font-family: Medium;
          margin-right: 10px;
        }

        .tag {
          font-family: Medium;
          font-size: 14px;
          padding: 5px;
          color: #0c5cd6;
          background: #E7ECF9;
        }
      }

      .bottomtitle {
        font-size: 14px;
      }
    }

    .right {
      font-family: Medium;
      font-size: 20px;
    }
  }
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
