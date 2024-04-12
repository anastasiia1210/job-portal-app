import axios, {AxiosResponse} from "axios";
import SeekerInterface, {SeekerEditInterface} from "../interfaces/SeekerInterface";

const URL = 'http://localhost:5555/seeker'
export class SeekerService{
    static async getOneSeekerByEmail(email: string): Promise<SeekerInterface> {
        const urlEmail = `${URL}/email/${email}`;
        try {
            const response: AxiosResponse<SeekerInterface> = await axios.get(urlEmail);
            return response.data;
        } catch (error) {
            console.error('Error fetching seeker:', error);
            throw error;
        }
    }

    static async getOneSeeker(id: string): Promise<SeekerInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<SeekerInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching seeker:', error);
            throw error;
        }
    }

    static async updateSeeker(id: string, updatedSeekerData: Partial<SeekerEditInterface>): Promise<SeekerInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response = await axios.patch<SeekerInterface>(urlId, updatedSeekerData);
            return response.data as SeekerInterface;
        } catch (error) {
            console.error('Error updating seeker:', error);
            throw error;
        }
    }

    static async addSeeker(addSeekerData: Partial<SeekerInterface>): Promise<SeekerInterface> {
        try {
            const response = await axios.post<SeekerInterface>(URL, addSeekerData);
            return response.data as SeekerInterface;
        } catch (error) {
            console.error('Error updating seeker:', error);
            throw error;
        }
    }
}
