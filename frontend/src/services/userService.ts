import {user} from "@/services/index";

export const fetchUserProfilePicturePath = async (email: string): Promise<string | null> => {
    const response = await user.get(`/profile-picture-path/${email}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(response.data);
    return response.data;
};
