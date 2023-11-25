1.首先，安装并导入axios库。你可以使用npm或yarn来安装：
**npm install axios --save**

2.创建一个api.js文件来管理接口封装：

```js
// api.js
import axios from 'axios';
const API_BASE_URL = 'https://api.example.com'; // 根据实际情况设置基础URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // 其他axios配置选项
});
// 封装具体的接口请求函数
const api = {
  async getPosts() {
    try {
      const response = await apiClient.get('/posts');
      return response.data;
    } catch (error) {
      console.error('获取失败：', error);
      throw error;
    }
  },
  async createPost(postData) {
    try {
      const response = await apiClient.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('创建失败：', error);
      throw error;
    }
  },
  // 可以继续添加其他接口请求函数
};
export default api;
```

3.在Vue组件中使用封装的接口：

```vue
<template>
 <div>
  <ul>
   <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
  <form @submit.prevent="submitForm">
   <input type="text" v-model="newPost.title" placeholder="请输入标题">
    <button type="submit">提交</button>
   </form>
  </div>
</template>
<script>
import { ref, reactive } from 'vue';
import api from './api'; // 导入封装的接口
export default {
  setup() {
    const posts = ref([]); // 使用ref定义一个响应式变量
    const newPost = reactive({ title: '' }); // 使用reactive定义一个响应式对象
const fetchPosts = async () => {
  try {
    const data = await api.getPosts(); // 调用封装的接口函数
    posts.value = data;
  } catch (error) {
    // 处理错误
  }
};
 
const submitForm = async () => {
  try {
    await api.createPost(newPost); // 调用封装的接口函数
    newPost.title = ''; // 清空输入框
    fetchPosts(); // 重新获取帖子列表
  } catch (error) {
    // 处理错误
  }
};
 
fetchPosts(); // 在组件初始化时获取帖子列表
return {
  posts,
  newPost,
  submitForm,
};
  },
};
</script>
```

