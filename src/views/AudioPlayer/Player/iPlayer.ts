interface IPlayer {
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
	getCurrentTime(): number
	/**
	 * 设置当前播放时间
	 */
	setCurrentTime(time: number): void
	/**
	 * 获取当前播放状态	true:播放 false:暂停
	 */
	getIsPlaying(): boolean
}
