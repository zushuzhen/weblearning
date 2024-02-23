<template>
  <div style="padding: 10px 20px 0 25px">
    <van-field v-model="grouppartfieldValue" is-link readonly placeholder="选择公司"
               @click="grouppartshowPicker = true"/>
    <van-popup v-model:show="grouppartshowPicker" round position="bottom">
      <van-picker :columns="pickerList" @cancel="grouppartshowPicker = false" @confirm="onConfirm"/>
    </van-popup>
    <div style="margin-top: 10px">
      <div class="process_container">
        <div v-for="(item) in processList" :key="item" class="process_item">
          <div class="process_num">
            <div class="process_cicle"></div>
            <div class="process_number">{{ item.title }}</div>
          </div>
          <div class="process_content">
            <div>{{ item.summary }}</div>
            <van-image v-for="ite in item.img" :key="ite" width="100%" fit="cover" position="centers" :src="ite.url"
                       class="image"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="honorswiper">
import {ref, onMounted, defineProps} from "vue";

const props = defineProps(["cmpData"]);
import {gettree, get} from "@/utils/request.js";

const grouppartfieldValue = ref('')//选择器文本
const grouppartshowPicker = ref(false)
const processList = ref("");
const pickerList = ref([]);

onMounted(() => {
  grouppartfieldValue.value=props.cmpData.children[0].name
  pickerList.value=props.cmpData.children.map(item=>{
    return{
      text: item.name,
      value: item.id,
    }
  })
  getdata(props.cmpData.children[0].id)
});
const getdata=(id)=>{
  let data = {
    categoryId: id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    processList.value = res.rows
  });
}
//弹窗确定
const onConfirm = (res) => {
  pickerList.value.map((item) => {
    if (item?.value == res?.selectedOptions[0]?.value) {
      getdata(res.selectedOptions[0].value)
    }
  });
  grouppartshowPicker.value = false;
  grouppartfieldValue.value = res?.selectedOptions[0]?.text;
};
</script>
<style scoped lang="scss">
.process_container {
  border-left: 2px dashed rgba(17, 128, 248, 0.6);
  padding: 0;
  padding-left: 50px;
}

.process_container .process_item:first-child .process_num_sale {
  top: 0;
}

.process_container .process_item:last-child .process_num_sale {
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  bottom: -10px;
  top: auto;
}

.process_container .process_item:first-child {
  justify-content: flex-start;
}

.process_container .process_item:last-child {
  justify-content: flex-end;
}

.process_container .process_item {
  position: relative;
  background: #f0f3fa;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: left;
  margin-bottom: 24px;
}

.process_container .process_item .process_content {
  font-size: 14px;
  color: #666666;
  line-height: 28px;
  text-indent: 2enm;
}

.process_container .process_item .process_num {
  position: absolute;
  top: 50%;
  left: -6px;
  transform: translate(-50px, -50%);
  display: flex;
  align-items: center;
}

.process_container .process_item .process_num .process_cicle {
  width: 10px;
  height: 10px;
  background: #888ff9;
  border-radius: 50%;
  margin-right: 5px;
  z-index: 999;
}

.process_container .process_num .process_number {
  width: 30px;
  height: 30px;
  padding: 2px;
  background: #0c5cd6;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #ffffff;
}

.process_container .process_item_sale {
  padding: 0 15px;
  margin: 0;
  justify-content: baseline;
}

.van-cell {
  border: 1px solid #eee !important;
}
</style>
