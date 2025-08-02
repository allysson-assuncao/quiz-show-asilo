import {question} from "@/services/index";
import {DeleteQuestionFormData, EditQuestionFormData, QuestionFormData} from "@/model/FormData";
import {FetchQuestionsPageParams, FetchQuestionsPageResponse, SimpleQuestion} from "@/model/Interfaces";

export const createQuestionRequest = async (data: QuestionFormData) => {
    const response = await question.post('/register', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(response.data)
    return response.data;
};

export const editQuestionRequest = async (data: EditQuestionFormData) => {
    const response = await question.put(`/update-question`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        data: data,
    })
    console.log(response.data)
    return response.data;
}

export const fetchAllSimpleQuestions = async (): Promise<SimpleQuestion[]> => {
    const response = await question.get('/select-all-simple', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const fetchQuestionsPage = async (params: FetchQuestionsPageParams)
    : Promise<FetchQuestionsPageResponse> => {
    const response = await question.get('/get-questions-page', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
            page: params.page || 0,
            size: params.size || 350,
            orderBy: params.orderBy || 'text',
            direction: params.direction || 'ASC',
        },
    });
    console.log(response)
    console.log(response.data)
    return response.data;
}

export const deleteQuestion = async (data: DeleteQuestionFormData): Promise<boolean> => {
    const response = await question.delete('/delete-question', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        data: data,
    })
    console.log(response.data)
    if (response.status === 204) {
        return true;
    }else {
        return false;
    }
}

export const fetchEditableQuestion = async (data: EditQuestionFormData): Promise<EditQuestionFormData> => {
    const response = await question.get(`/editable/${data.questionId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        data: data,
    })
    console.log(response.data)
    return response.data;
}