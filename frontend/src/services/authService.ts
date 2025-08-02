import { auth } from '@/services/index'
import {LoginFormData} from '@/model/FormData'

export const loginRequest = async (data: LoginFormData) => {
    const response = await auth.post('/login', data, {});
    console.log(response.data);
    return response.data;
}

export const registerRequest = async (data: FormData) => {
    const response = await auth.post('/register', data, {});
    return response.data;
}
