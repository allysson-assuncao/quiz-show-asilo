import {user} from "@/services/index";

export const fetchUserProfilePicturePath = async (email: string) => {
    const response = await user.post('/profile-picture-path', email, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
