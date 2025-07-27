import {ResultRequest, ResultSummary} from "@/model/Interfaces";
import {result} from "@/services/index";

export const submitResultRequest = async (data: ResultRequest): Promise<ResultSummary> => {
    const response = await result.post('/register', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(data);
    console.log(response.data);
    return response.data;
};
