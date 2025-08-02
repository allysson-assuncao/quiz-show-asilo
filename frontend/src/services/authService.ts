import {auth} from '@/services/index'
import {LoginFormData, RegisterFormData} from '@/model/FormData'

export const loginRequest = async (data: LoginFormData) => {
    const response = await auth.post('/login', data, {});
    console.log(response.data);
    return response.data;
}

export const registerRequest = async (data: RegisterFormData) => {
    const formData = new FormData();

    const userDto = {
        username: data.username,
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
    };
    formData.append('user', new Blob([JSON.stringify(userDto)], {type: 'application/json'}));

    if (data.profilePicture) {
        formData.append('profilePicture', data.profilePicture);
    }

    const response = await auth.post('/register', formData);
    return response.data;
}
