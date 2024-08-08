type IplayerInfo = {
	/**
	 * 歌曲名称
	 */
	name: string

	/**
	 * 歌曲封面
	 */
	cover: string

	/**
	 * 歌曲作者
	 */
	author: string

	/**
	 * 歌曲链接
	 */
	url: string

	/**
	 * 歌曲ID
	 */
	id: string

	/**
	 * 歌词信息
	 */
	lyric: string
}

interface IPlayerMethods {
	/**
	 * 播放
	 */
	play(): void

	/**
	 * 暂停
	 */
	pause(): void

	/**
	 * 获取当前播放时间
	 */
	get currentTime(): number

	/**
	 * 设置当前播放时间
	 */
	set currentTime(time: number)

	/**
	 * 获取当前播放状态	true:播放 false:暂停
	 */
	get isPlaying(): boolean

	/**
	 * 获取音量
	 */
	get volume(): number

	/**
	 * 设置音量
	 * @param volume 音量值 0-1
	 */
	set volume(volume: number)

	/**
	 * 获取总时长
	 */
	get duration(): number

	/**
	 * 获取播放速度
	 */
	get speed(): number
	/**
	 * 播放速度
	 * @default 1
	 * @param speed 播放速度
	 */
	set speed(speed: number)

	/**
	 * 切换歌曲
	 * @param info 歌曲信息
	 */
	switch(info: IplayerInfo): void

	/**
	 * 销毁
	 */
	destroy(): void
}

interface IPlayerMembers {
	/**
	 * 播放器信息
	 * @type {IplayerInfo}
	 */
	playerInfo: IplayerInfo
}

interface Iplayer extends IPlayerMethods, IPlayerMembers {

}

interface IPlayerEvents {
	play: never
	pause: number
	timeupdate: number
	volumechange: number
	speedchange: number
	ended: void
}
