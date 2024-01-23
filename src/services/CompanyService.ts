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

    async getOneCompany(id: string): Promise<CompanyInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<CompanyInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching company:', error);
            throw error;
        }
    }
}
