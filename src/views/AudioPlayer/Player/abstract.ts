interface EventMap {
	[event: string]: any
}

type Listener<T = any> = (event?: T) => void

abstract class IEventSystem<T extends EventMap> {
	private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {}

	// 添加事件侦听器
	on<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}
		this.listeners[event]!.push(listener)
	}

	// 移除事件侦听器
	off<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
		if (!this.listeners[event]) {
			return
		}
		this.listeners[event] = this.listeners[event]!.filter((l) => l !== listener)
	}

	// 触发事件
	// emit<K extends keyof T>(event: K, payload: T[K]): void {
	emit<K extends keyof T>(...args: T[K] extends never ? [K] : [K, T[K]]): void {
		if (!this.listeners[args[0]]) {
			return
		}
		for (const listener of this.listeners[args[0]]!) {
			listener(args[1])
		}
	}

	// 一次性事件侦听器
	once<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
		const onceListener: Listener<T[K]> = (payload) => {
			this.off(event, onceListener)
			listener(payload)
		}
		this.on(event, onceListener)
	}

	// 销毁所有事件侦听器
	offAll() {
		this.listeners = {}
	}
}

export { IEventSystem }
