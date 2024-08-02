import axios, { AxiosError } from 'axios'

interface ResType<T = any> {
	code: number
	data?: T
	msg: string
	err?: string
}

interface Request {
	get<T>(url: string, params?: unknown): Promise<ResType<T>>

	post<T>(url: string, params?: unknown): Promise<ResType<T>>

	put<T>(url: string, params?: unknown): Promise<ResType<T>>

	delete<T>(url: string, params?: unknown): Promise<ResType<T>>
}

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_BASE_API
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//请求拦截器
axios.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem('token') // todo

		if (token) {
			config.headers.token = token
		}
		return config
	},
	(error: Error) => {
		return error
	}
)

// 响应拦截
axios.interceptors.response.use(
	(res: any) => {
		switch (res.data.code) {
			case 200:
				return JSON.stringify(res.data)
			default:
				return res
		}
	},
	(error: AxiosError) => {
		// 接收到异常响应的处理开始
		if (error && error.response) {
			switch (error.response.status) {
				case 401:
					error.message = 'unauthorized'
					break
				case 422:
					error.message = 'invalid parameter'
					break

				//todo other code....
				default:
					error.message = error.response.status + ''
			}
		}
		//todo catch timeout error
		/*	else {
			if (JSON.stringify(error).includes("timeout")) {
			}
		}*/
		return Promise.resolve(error.response)
	}
)

const Request: Request = {
	get(url, params) {
		return new Promise((resolve, reject) => {
			axios
				.get(url, { params })
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => {
					reject(err.data)
				})
		})
	},
	post(url, params) {
		return new Promise((resolve, reject) => {
			axios
				.post(url, JSON.stringify(params))
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => {
					reject(err.data)
				})
		})
	},

	put(url, params) {
		return new Promise((resolve, reject) => {
			axios
				.put(url, JSON.stringify(params))
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => {
					reject(err.data)
				})
		})
	},
	delete(url, params) {
		return new Promise((resolve, reject) => {
			axios
				.delete(url, { params })
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => {
					reject(err.data)
				})
		})
	}
}

export default Request
