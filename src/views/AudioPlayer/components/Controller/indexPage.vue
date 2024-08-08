<template>
	<div class="control-btns">
		<div class="btn-item" @click="handlePrev">上</div>
		<div class="btn-item" @click="handleSwitch">{{ isPlay ? 'pause' : 'play' }}</div>
		<div class="btn-item" @click="handleNext">下</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
	defineProps<{
		isPlay?: boolean
	}>(),
	{
		isPlay: false
	}
)

const emits = defineEmits<{
	prev: []
	next: []
	play: []
	pause: []
}>()

const handlePrev = () => emits('prev')
const handleNext = () => emits('next')
const handleSwitch = () => {
	const type: any = props.isPlay ? 'pause' : 'play'
	emits(type)
}
</script>

<style lang="less" scoped>
.control-btns {
	display: flex;
	justify-content: space-between;
	.btn-item {
		width: 40px;
		height: 40px;
		background-color: #fde7c6;
	}
}
</style>
