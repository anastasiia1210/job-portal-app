import axios, {AxiosResponse} from "axios";
import {JobRequestInterface, CreateJobRequest} from "../interfaces/JobRequestInterface";

const URL = 'http://localhost:5555/job-request'
export class JobRequestService{
    static async getAllRequestsOneSeeker(id: string): Promise<JobRequestInterface[]> {
        const urlId = `${URL}/seeker/${id}`;
        try {
            const response: AxiosResponse<JobRequestInterface[]> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching requests:', error);
            throw error;
        }
    }

    static async getAllRequestsJobOffer(id: string): Promise<JobRequestInterface[]> {
        const urlId = `${URL}/job-offer/${id}`;
        try {
            const response: AxiosResponse<JobRequestInterface[]> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching requests:', error);
            throw error;
        }
    }

    static async getOneRequest(id: string): Promise<JobRequestInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<JobRequestInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching request:', error);
            throw error;
        }
    }

    static async createJobRequest(requestData: CreateJobRequest): Promise<JobRequestInterface> {
        try {
            const response: AxiosResponse<JobRequestInterface> = await axios.post(URL, requestData);
            return response.data;
        } catch (error) {
            console.error('Error creating request:', error);
            throw error;
        }
    }

    static async updateJobRequest(id: string | undefined, requestData: Partial<CreateJobRequest>): Promise<JobRequestInterface> {
        try {
            const response: AxiosResponse<JobRequestInterface> = await axios.put(`${URL}/${id}`, requestData);
            return response.data;
        } catch (error) {
            console.error('Error updating request:', error);
            throw error;
        }
    }

    static async deleteRequest(id: string | undefined): Promise<void> {
        const urlId = `${URL}/${id}`;
        try {
            await axios.delete(urlId);
            console.log('Request deleted successfully');
        } catch (error) {
            console.error('Error deleting request:', error);
            throw error;
        }
    }
}
