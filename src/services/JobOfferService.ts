import JobOfferInterface from "../interfaces/JobOfferInterface";
import axios, {AxiosResponse} from "axios";

const URL = 'http://localhost:5555/job-offer'

export class JobOfferService{
    static async getAllOffers(): Promise<JobOfferInterface[]> {
        try {
            const response: AxiosResponse<JobOfferInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching job offers:', error);
            throw error;
        }
    }

    static async getOneOffer(id: string): Promise<JobOfferInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<JobOfferInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching job offer:', error);
            throw error;
        }
    }
}
