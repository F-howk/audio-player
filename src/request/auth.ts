import axios from './index'

namespace Login {
	export interface LoginReqForm {
		username: string
		password: string
	}
}
export const login: any = (params: Login.LoginReqForm) => {
	return axios.post('/v1/auth/login', params)
}
