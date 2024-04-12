import axios, { AxiosResponse } from "axios";
import { CreateEmployerInterface, EmployerInterface } from "../interfaces/EmployerInterface";

const URL = 'http://localhost:5555/employer';

export class EmployerService {
    async createEmployer(employerData: CreateEmployerInterface): Promise<EmployerInterface> {
        try {
            const response: AxiosResponse<EmployerInterface> = await axios.post(URL, employerData);
            return response.data;
        } catch (error) {
            console.error('Error creating employer:', error);
            throw error;
        }
    }

    async getEmployerById(id: string): Promise<EmployerInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<EmployerInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching employer by ID:', error);
            throw error;
        }
    }

    async getOneEmployerByEmail(email: string): Promise<EmployerInterface> {
        const urlEmail = `${URL}/email/${email}`;
        try {
            const response: AxiosResponse<EmployerInterface> = await axios.get(urlEmail);
            return response.data;
        } catch (error) {
            console.error('Error fetching employer:', error);
            throw error;
        }
    }

    async updateEmployer(id: string, updatedEmployerData: Partial<EmployerInterface>): Promise<EmployerInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response = await axios.patch<EmployerInterface>(urlId, updatedEmployerData);
            return response.data as EmployerInterface;
        } catch (error) {
            console.error('Error updating employer:', error);
            throw error;
        }
    }
}

