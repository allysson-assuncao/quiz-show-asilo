import {ResultRequest, ResultSummary} from "@/model/Interfaces";
import {result} from "@/services/index";

export const submitResultRequest = async (data: ResultRequest): Promise<ResultSummary> => {
    const response = await result.post('/api/results', data);
    return response.data;
};
