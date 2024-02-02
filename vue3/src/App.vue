<script setup>
	import HelloWorld from './components/HelloWorld.vue'
	import TheWelcome from './components/TheWelcome.vue'
	import collapse from './pages/collapse.vue'
</script>

<template>
	<header>
		<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" style="width: 125px" />-->
		<!--    <van-button type="primary" @click="showToast('toast')">button</van-button>-->
		<!--    <span style="font-size: 20px">123</span>-->
		<collapse></collapse>
	</header>

</template>

<style scoped>
	#app {
		margin: 0 !important;
		padding: 0 !important;
	}
</style>