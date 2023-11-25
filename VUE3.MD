## 导出

```cmd
import * as XLSX from 'xlsx';
```



```typescript
<script setup lang="ts">
import * as XLSX from 'xlsx';
// 使用接口的声明
interface Item {
    link_man: string;
    phone: string;
}
const Download = () => {
    let data = {
        page: 1,
        paginate: 300,
        queryText:  '',
    }
    //从列表接口获取所有数据
    hotList(data).then(res => {
        console.log(res.data.data);
        //遍历出需要的数据
        let datas: Item[] = res.data.data.map((item: any) => {
            return {
                link_man: item?.link_man ? item?.link_man : '',
                phone: item?.phone ? item?.phone : '',
            }
        })
        // 定义导出的 Excel 表头  
        const header = [
            { header: '联系人', key: 'link_man' },
            { header: '电话', key: 'phone' },
        ];
        // 将数据和表头转换成一个 worksheet
        const worksheet = XLSX.utils.json_to_sheet([header.map(h => h.header), ...datas.map(row => header.map(h => row[h.key]))], { skipHeader: true });
        // 创建一个 workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, '山东省高新视频创新大赛参赛作品导出.xlsx');
        setTimeout(() => {
            console.log('导出成功');
        }, 500)
    })
}
</script>
```

## 传值

```ts
//父组件
import ListHeader from '路径';
const clickEven = (val: string) => {
  console.log(val)
  yearValue.value = val
  getHotList()
}
<ListHeader :total="total" @yearChange="clickEven"/>

//子组件
import { ref, toRefs } from 'vue'
const { total } = toRefs(props)  
const props = defineProps({
    //子组件接收父组件传递过来的值声明
    total: Number
})
const yearChange = (val: string) => {
  emit('yearChange', val);
};
let data = {
    total：total.value,
}

```

二，vue3使用
1，vue3官网

Vue.js - 渐进式 JavaScript 框架 | Vue.js (vuejs.org)
https://cn.vuejs.org/
2，通过Vite建立项目

①打开命令提示符，全局安装vite
npm  install   -g   vite@latest

②npm更新版本（非必要）

npm   install   -g   npm

③在命令提示符中选择目录后，在此目录下创建文件项目

npm   init   vite@latest   文件项目名字    --   --template   vue-ts

④vscode打开文件项目


 ⑤在vscode终端输入命令运行

npm  install

npm  run  dev

## **三，Vue-Router使用**

1，使用vscode的终端安装组件

  npm install  vue-router@4

2，添加路由，在src目录下建立router文件夹，并在router文件夹下创建文件index.ts

```
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
const routes = [
    {
        path: '/',
        component: () => import("../views/Hello.vue")
    },
 
    {
        path: '/product',
        component: () => import("../views/product/Index.vue"),
        children: [{
            path: '/product/goods',
            component: () => import("../views/product/Goods.vue")
        },
        {
            path: '/product/price',
            component: () => import("../views/product/Price.vue")
        }
        ]
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
```

3，在main.ts文件中加入并使用router路由

```
import { createApp } from 'vue'
import App from './App.vue'
 
//加入路由
import router from './router/index';
//并通过use，使用路由
createApp(App).use(router).mount('#app')
```

4.在App.vue 添加导航，并使用router-view

## 四，使用@别名

1，在终端安装组件

 npm install @types/node --save-dev

## 五，不用路由(route)传值

##### 传出

```js
const navto = (item,index) => {
 let href = item.href
 window.location.href = href+`?name=${index}`;
}
```
##### 接收

```js
import { ref, onMounted } from "vue";
onMounted(() => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get('name');
  console.log(name); // 输出接收到的name参数的值
  console.log(typeof(name));
  active.value =Number(name) 
});
```
