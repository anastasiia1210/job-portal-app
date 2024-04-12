import JobOfferInterface, {CreateJobOfferInterface} from "../interfaces/JobOfferInterface";
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

    static async createOffer(offer: CreateJobOfferInterface): Promise<JobOfferInterface> {
        try {
            const response: AxiosResponse<JobOfferInterface> = await axios.post(URL, offer);
            return response.data;
        } catch (error) {
            console.error('Error add job offers:', error);
            throw error;
        }
    }

    static async deleteOffer(id: string): Promise<JobOfferInterface> {
        try {
            const response: AxiosResponse<JobOfferInterface> = await axios.delete(`${URL}/${id}`);
            console.log('job offer deleted successfully');
        } catch (error) {
            console.error('Error deleting job offer:', error);
            throw error;
        }
    }

    static async updateOffer(id: string, updatedOffer: Partial<CreateJobOfferInterface>): Promise<JobOfferInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<JobOfferInterface> = await axios.patch(urlId, updatedOffer);
            return response.data;
        } catch (error) {
            console.error('Error updating job offer:', error);
            throw error;
        }
    }

}
