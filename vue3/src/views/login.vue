<template>
  <div>
    
  </div>
</template>

<script>
export default {
  // 创建前：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。'
  beforeCreate() {

  },
  // 创建后：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
  created() {

  },
  // 编译前：在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() {

  },
  // 编译后：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {

  },
  // 更新前: 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  beforeUpdate() {

  },
  // 更新后: 由于数据更改导致的虚拟 DOM 重新渲染和打补丁后调用。
  updated() {

  },
  // 卸载前: 在实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeUnmount() {

  },
  // 卸载后：在所有的指令被解绑定后调用。
  unmounted() {

  },
  data() {
    return {
      message: 'Hello, Vue 3!'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Message Changed!';
    }
  }
};
</script>

<style scoped>
/* 样式可以放在这里 */
</style>