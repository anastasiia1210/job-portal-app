import LoginInterface from "../interfaces/LoginInterface";
import axios from "axios";
import LoginResponseInterface from "../interfaces/LoginResponseInterface";

const URL = 'http://localhost:5555/login'

export class LoginService{
    static async loginUser(loginData: LoginInterface): Promise<LoginResponseInterface> {
        try {
            const response = await axios.post(URL, loginData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
