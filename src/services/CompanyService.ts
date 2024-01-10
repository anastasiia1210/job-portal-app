import axios, {AxiosResponse} from "axios";
import CompanyInterface from "../interfaces/CompanyInterface";

const URL = 'http://localhost:5555/company'

export class CompanyService{
    async getAllCompanies(): Promise<CompanyInterface[]> {
        try {
            const response: AxiosResponse<CompanyInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching companies:', error);
            throw error;
        }
    }
}
