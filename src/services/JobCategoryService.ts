import axios, {AxiosResponse} from "axios";
import JobCategoryInterface from "../interfaces/JobCategoryInterface";

const URL = 'http://localhost:5555/job-category'

export class JobCategoryService{
    static async getAllCategories(): Promise<JobCategoryInterface[]> {
        try {
            const response: AxiosResponse<JobCategoryInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    static async getOneCategory(id: string): Promise<JobCategoryInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<JobCategoryInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching cv:', error);
            throw error;
        }
    }

}
