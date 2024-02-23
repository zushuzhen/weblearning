<template>
  <div>
    <div class="Island">
      <div class="subtabs">
        <!--        <van-tabs v-model:active="subactive" type="card" @click-tab="vantabs">-->
        <!--          <van-tab-->
        <!--              v-for="item in tabs"-->
        <!--              :key="item"-->
        <!--              :title="item.name"-->
        <!--          >-->
        <!--            <div class="videolisttop">-->
        <!--              <videolist :list="list"></videolist>-->
        <!--            </div>-->
        <!--          </van-tab>-->
        <!--        </van-tabs>-->
        <div class="islandd">
          <van-field v-model="fieldValue" is-link readonly placeholder="选择" @click="showPicker = true"/>
        </div>
        <div>
          <!--          <bititle :title="fieldValue"/>-->
          <div class="videolisttop">
            <videolist :list="list"></videolist>
          </div>
        </div>
      </div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="corporationlist" @cancel="showPicker = false" @confirm="vantabs"/>
      </van-popup>
      <van-pagination
          v-if="list.length!=0"
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
  </div>
</template>

<script setup name="Island">
import bititle from "../title.vue";
import newlist from "../newslist.vue";
import videolist from '../videolist.vue'
import {get} from "@/utils/request.js";
import {ref, onMounted, defineProps, watchEffect, nextTick} from "vue";
import {gettree} from '../../../../utils/request'

const props = defineProps(["cmpData"]);
const list = ref([]);
const pageNum = ref(1); //当前页码
const pageSize = ref(10); //分页大小
const total = ref(10);//总数
const tabs = ref([])//tab
const showPicker = ref(false)//弹窗
const fieldValue = ref('')//已选择
const content = ref({})//已选内容
const corporationlist = ref([])
onMounted(() => {
  getlist();
});
const getlist = async () => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    pageNum: 1,
    pageSize: pageSize,
  };
  gettree(props.cmpData.id, false).then((res) => {
    console.log(res)
    tabs.value = res.data
    fieldValue.value = res.data[0].name
    corporationlist.value = res.data.map(item => {
      return {
        text: item.name,
        value: item.id
      }
    })
    let id = res.data[0].id;
    query(id);
  });
};

function query(id) {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  };
  get("/cms/vr/list", data).then((res) => {
    console.log(res.rows);
    content.value = res.rows;
    list.value = res.rows;
    total.value = res.total;
  });
}

const nexts = () => {
  console.log(pageNum.value);
  getlist();
};

const vantabs = (res) => {
  fieldValue.value = res.selectedOptions[0].text
  tabs.value.map((item, index) => {
    if (res.selectedOptions[0].value == item.id) {
      let id = item.id
      query(id);
    }
  })
  showPicker.value = false
}
</script>

<style lang="scss">
.Island {
  padding: 0 20px 20px 20px;
}

.videolisttop {
  margin-top: 20px;
}

.islandd {
  margin-bottom: 20px;

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

</style>
