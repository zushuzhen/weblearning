<template>
  <div class="pagerview"   v-show="pageTotal&&pageTotal>1">
    <div class="pagerBox centerLocation">
      <ul class="pagination">
        <li v-if="pageNum != 1" @click="currentPage(1)">
          <a aria-label="Previous">
            <span aria-hidden="true">首页</span>
          </a>
        </li>
        <li v-if="pageNum != 1" @click="perPage">
          <a aria-label="Previous">
            <span aria-hidden="true">上一页</span>
          </a>
        </li>
        <li
            v-for="(page, index) in pageNumber.value"
            :key="index"
            :class="{ active: page === pageNum }"
            @click="currentPage(page)"
        >
          <a>
            {{ page }}
          </a>
        </li>
        <li v-if="pageNum != pageTotal" @click="nextPage">
          <a aria-label="Next">
            <span aria-hidden="false">下一页</span>
          </a>
        </li>
        <li v-if="pageNum != pageTotal" @click="currentPage(pageTotal)">
          <a aria-label="Next">
            <span aria-hidden="true">尾页</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {reactive, computed, toRefs, onMounted, ref} from "vue";

const props = defineProps(['pageNum', 'total', 'pageSize'])
const emit = defineEmits(['change','update:pageNum','update:total']);

const {pageNum, total,pageSize} = toRefs(props);
const pageTotal = ref(0)
onMounted(() => {
  let pageSize = props.pageSize ?? 10;
  pageTotal.value = Math.ceil(total / pageSize)
});

//根据传递的pageNum来判断前后关系
const pageCollege = computed(() => {
  let pageSize = props.pageSize ?? 10;
  pageTotal.value = Math.ceil(total.value / pageSize)
  let pageno = pageNum.value;
  let pagetotal = pageTotal.value;
  if (pagetotal < 7) {
    return pagetotal;
  }
  if (pageno <= 5) {
    return [1, 2, 3, 4, 5, "...", pagetotal];
  } else if (pageno > pagetotal - 5) {
    return [
      1,
      "...",
      pagetotal - 4,
      pagetotal - 3,
      pagetotal - 2,
      pagetotal - 1,
      pagetotal,
    ];
  } else {
    return [1, "...", pageno - 1, pageno, pageno + 1, "...", pagetotal];
  }
});

//判断下面的条数
const pageNumber = computed(() => {
  return pageCollege;
});

//上一页的方法
function perPage() {
  if (pageNum.value === 1) {
    return;
  }
  let curNum = pageNum.value -1
  emit('update:pageNum',curNum)
  emit('change', {
    pageNum: curNum,
    pageTotal
  })
}

//下一页的方法
function nextPage() {
  if (pageNum.value == pageTotal.value) {
    return;
  }
  console.log(pageNum.value)
  let curNum = pageNum.value+1;
  emit('update:pageNum',curNum)
  emit('change', {
    pageNum: curNum,
    pageTotal
  })
}

//点击确定的一页
function currentPage(page) {
  if (page == pageNum.value) return;
  if (page === "...") {
    return;
  }
  emit('update:pageNum',page)
  emit('change', {
    pageNum: page,
    pageTotal
  })
}

</script>

<style lang="scss" scoped>
.pagerview {
  margin: 25px 0px 20px 0;

  .pagerBox {
    margin: 5px 0px;
    text-align: center;

    .pagination {
      margin-bottom: 0px;

      li {
        padding: 5px 20px;
        display: inline-block;
        line-height: 35px;
        font-size: 12px;
        color: #565656;
        border: 1px solid #e0e0e0;
        cursor: pointer;
        margin: 0 7px;
      }

      .active {
        cursor: not-allowed;
        background-color: #0c5cd6;
        border: 1px solid #0c5cd6;

        a {
          color: #fff !important;
        }
      }
    }

    .disabledBox {
      display: none;
    }
  }
}
</style>
