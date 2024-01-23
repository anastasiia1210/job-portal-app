import CVInterface from "../interfaces/CVInterface";
import axios, {AxiosResponse} from "axios";

const URL = 'http://localhost:5555/cv'

export class CVService{
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

}
