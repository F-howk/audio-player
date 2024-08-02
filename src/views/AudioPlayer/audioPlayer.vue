<template>
	<div class="player-wrap">
		<div>
			<Record />
			<Controller />
		</div>
		<div>
			<SongInfo />
		</div>
		<div>
			<Collect />
			<PlayList />
		</div>
	</div>
</template>

<script setup lang="ts">
import Record from './components/Record/indexPage.vue'
import Controller from './components/Controller/indexPage.vue'
import SongInfo from './components/SongInfo/indexPage.vue'
import Collect from './components/Collect/indexPage.vue'
import PlayList from './components/PlayList/indexPage.vue'

</script>

<style lang="less" scoped>
.player-wrap {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	width: 1200px;
	height: 100vh;
	margin: 0 auto;
	& > div {
		border-right: 1px solid #dcdfe6;
		height: 100%;
		flex: 1;
		&:nth-child(1) {
			border-left: 1px solid #dcdfe6;
		}
	}
}
</style>
