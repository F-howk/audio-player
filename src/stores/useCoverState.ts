import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCoverState = defineStore('coverState', () => {
	const zIndex = ref(2000)

	const get = () => ++zIndex.value

	return {
		zIndex,
		get
	}
})

// import { useCoverState } from '@/stores/useCoverState'
