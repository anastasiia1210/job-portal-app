import CVInterface from "../interfaces/CVInterface";
import axios, {AxiosResponse} from "axios";
import JobCategoryInterface from "../interfaces/JobCategoryInterface";

const URL = 'http://localhost:5555/job-category'

export class JobCategoryService{
    static async getAllCategories(): Promise<JobCategoryInterface[]> {
        try {
            const response: AxiosResponse<CVInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    static async getOneCV(id: string): Promise<CVInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<CVInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching cv:', error);
            throw error;
        }
    }

}
