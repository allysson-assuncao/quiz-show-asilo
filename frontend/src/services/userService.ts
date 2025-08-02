import {user} from "@/services/index";

export const fetchUserProfilePicturePath = async (email: string): Promise<string | null> => {
    const response = await user.post('/profile-picture-path', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: {email},
        responseType: 'text',
    });
    return response.data;
};
