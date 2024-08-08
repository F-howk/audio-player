<template>
	<div class="player-wrap">
		<div>
			<Record />
			<Controller
				:is-play="isPLay"
				@play="player.play()"
				@pause="player.pause()"
				@prev="handleSwitch('prev')"
				@next="handleSwitch('next')"
			/>
		</div>
		<div>
			<SongInfo />
		</div>
		<div class="list-box">
			<Collect />
			<PlayList />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Record from './components/Record/indexPage.vue'
import Controller from './components/Controller/indexPage.vue'
import SongInfo from './components/SongInfo/indexPage.vue'
import Collect from './components/Collect/indexPage.vue'
import PlayList from './components/PlayList/indexPage.vue'
import { Player } from './Player/player'

const playList = ref<IplayerInfo[]>([
	{
		id: '1',
		name: '如始之末',
		author: '周杰伦',
		lyric: 'https://api.itooi.cn/music/netease/lrc?id=436514312',
		url: new URL('../../assets/audio/rszm.mp3', import.meta.url).href,
		cover: 'https://api.itooi.cn/music/netease/pic?id=109951165775821936&key=579621905'
	},
	{
		id: '2',
		name: '危险派对',
		author: '周杰伦',
		lyric: 'https://api.itooi.cn/music/netease/lrc?id=436514312',
		url: new URL('../../assets/audio/wspd.mp3', import.meta.url).href,
		cover: 'https://api.itooi.cn/music/netease/pic?id=109951165775821936&key=579621905'
	}
])

let currentSong = playList.value[1]

const isPLay = ref(false)
const player = new Player({ playerInfo: currentSong })

player.on('play', () => {
	isPLay.value = player.isPlaying
})

player.on('pause', () => {
	isPLay.value = player.isPlaying
})

const handleSwitch = (type: 'prev' | 'next') => {}
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
	.list-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		& > div {
			flex: 1;
		}
	}
}
</style>
