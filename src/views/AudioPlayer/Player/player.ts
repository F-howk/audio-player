import { IEventSystem } from './abstract'

class Player extends IEventSystem<IPlayerEvents> implements Iplayer {
	/**
	 * 当前播放时间
	 * @type {number} ms
	 * @private
	 */
	#currentTime: number

	/**
	 * 总时长
	 * @type {number} ms
	 * @private
	 */
	#duration: number

	/**
	 * 播放器主体
	 */
	#container: HTMLAudioElement

	/**
	 * 音量
	 * @type {number}
	 * @private
	 */
	#volume: number = 1

	/**
	 * 速度
	 * @type {number}
	 * @private
	 */
	#speed: number = 1

	playerInfo: IplayerInfo

	constructor(configs: { playerInfo: IplayerInfo }) {
		super()

		const info = configs.playerInfo || {}
		this.playerInfo = JSON.parse(JSON.stringify(info))

		this.#container = new Audio(this.playerInfo.url || '')

		this.#container.addEventListener('play', () => {
			this.emit('play')
		})
		this.#container.addEventListener('pause', () => {
			this.emit('pause', this.currentTime)
		})

		this.#currentTime = 0
		this.#duration = this.#calcDuration()
	}

	/**
	 * 计算总时长
	 * @returns {number} ms
	 * @private
	 */
	#calcDuration(): number {
		return this.#container.duration * 1000
	}

	play() {
		this.#container.play()
	}

	pause() {
		this.#container.pause()
	}

	get isPlaying() {
		return !this.#container.paused
	}

	get currentTime(): number {
		return this.#currentTime
	}

	set currentTime(time: number) {
		this.#currentTime = time
		this.emit('timeupdate', time)
	}

	get volume(): number {
		return this.#volume
	}

	set volume(volume: number) {
		this.#volume = volume
		this.emit('volumechange', volume)
	}

	get duration() {
		return this.#duration
	}

	get speed(): number {
		return this.#speed
	}

	set speed(speed: number) {
		this.#speed = speed
		this.emit('speedchange', speed)
	}

	switch(info: typeof this.playerInfo) {
		this.playerInfo = JSON.parse(JSON.stringify(info || {}))
	}

	destroy() {
		this.#container?.remove()
		this.#container = null as any
		this.#currentTime = 0
		this.#duration = 0
		this.playerInfo = {} as IplayerInfo
		this.offAll()
	}
}

export { Player }
