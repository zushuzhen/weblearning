<template>
  <div style="padding: 0 20px;background: #050b1e;">
    <van-collapse v-for="(item, index) in menuList" :key="item.id" v-model="activeName" accordion>
      <van-collapse-item :name="item.id" @click="tourl(item, index)">
        <template #title>
          <div class="border">{{ item.name }}</div>
        </template>
        <template #right-icon>
          <van-icon name="arrow" :style="{
            transform: `rotate(${item.children.length == 0 ? 0 : (item.open ? 0 : 90)}deg)`,
            transformOrigin: 'center center',
            paddingRight: `${item.children.length == 0 ? 5 : (item.open ? 5 : 10)}px`,
            marginTop: `${item.open ? 0 : 10}px`
          }" />
        </template>
        <van-cell v-for="(ite, index) in item.children" :key="ite.id" :title="ite.name" @click.stop="navto(ite, index)" />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script setup >
import { ref, onMounted } from "vue";
const activeName = ref('0');
const url = ref()
const id = ref()
const menuList = ref()
const relate = ref({
  titlephone: '联系电话',
  phone: '0532-66776720',
})
onMounted(async () => {
  let val = [
    { id: "0", name: "第一", children: [] },
    { id: "1", name: "第二", children: [{ id: "1", name: "1", }, { id: "2", name: "2" }] },
    { id: "2", name: "第三", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "3", name: "第四", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "4", name: "第五", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "5", name: "第六", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "6", name: "第七", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "7", name: "第八", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "8", name: "第九", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "9", name: "第十", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "10", name: "第十一", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
    { id: "11", name: "第十二", children: [{ id: "3", name: "4", }, { id: "2", name: "2" }] },
  ]
  menuList.value = val.map(item => {
    return {
      ...item,
      open: false,
    }
  })
});
//存储链接
const tourl = (item, index) => {
  console.log(item.children);
  if (item.children.length == 0) {
    window.location.href = item.url
  } else {
    url.value = item.url;
    id.value = item.id;
    let number = index
    menuList.value = menuList.value.map((ite, ind) => ({
      ...ite,
      open: ind == number ? (item.open ? false : true) : false,
    }));
  }
}
//跳转页面
const navto = (ite, index) => {
  menuList.children == ite
  //   console.log(ite, index);
  //   window.location.href = url.value + `?name=${index}&id=${id.value}`;
}
</script>
<style lang="scss">
.van-cell {
  color: #fff !important;
  background: #050b1e !important;
  border: none !important;
  position: static !important;
  border-bottom: 1px solid #333 !important;
}

.van-cell:after {
  position: static !important;
}

.van-collapse-item__content {
  background: #050b1e !important;
  padding: 0 !important;
  margin: 0 16px !important;
}

.van-collapse van-hairline--top-bottom {
  border: none !important;
}

[class*=van-hairline]:after {
  position: relative !important;
}
</style>















