import CVInterface, {CreateCVInterface} from "../interfaces/CVInterface";
import axios, {AxiosResponse} from "axios";

const URL = 'http://localhost:5555/cv'

export class CVService{
    static async getAllCvs(): Promise<CVInterface[]> {
        try {
            const response: AxiosResponse<CVInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching cvs:', error);
            throw error;
        }
    }
    static async getAllCvsOneSeeker(id: string): Promise<CVInterface[]> {
        const urlId = `${URL}/seeker/${id}`;
        try {
            const response: AxiosResponse<CVInterface[]> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching cvs:', error);
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

    static async createCV(cv: CreateCVInterface): Promise<CVInterface> {
        try {
            const response: AxiosResponse<CVInterface> = await axios.post(URL, cv);
            return response.data;
        } catch (error) {
            console.error('Error creating CV:', error);
            throw error;
        }
    }

    static async deleteCV(cvId: string): Promise<CVInterface> {
        try {
            const response: AxiosResponse<CVInterface> = await axios.delete(`${URL}/${cvId}`);
            console.log('CV deleted successfully');
        } catch (error) {
            console.error('Error deleting CV:', error);
            throw error;
        }
    }

    static async updateCV(cvId: string, updatedFields: Partial<CreateCVInterface>): Promise<CVInterface> {
        const urlId = `${URL}/${cvId}`;
        try {
            const response: AxiosResponse<CVInterface> = await axios.patch(urlId, updatedFields);
            return response.data;
        } catch (error) {
            console.error('Error updating CV:', error);
            throw error;
        }
    }

}
