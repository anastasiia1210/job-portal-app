import SeekerInterface from "../interfaces/SeekerInterface";
import axios, {AxiosResponse} from "axios";
import CVInterface from "../interfaces/CVInterface";
import JobRequestInterface from "../interfaces/JobRequestInterface";

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
}
