import LoginInterface from "../interfaces/LoginInterface";
import axios from "axios";
import LoginResponseInterface from "../interfaces/LoginResponseInterface";

const URL = 'http://localhost:5555/login'
const URLSignUp = 'http://localhost:5555/registration'

export class LoginService{
    static async loginUser(loginData: LoginInterface): Promise<LoginResponseInterface> {
        try {
            const response = await axios.post(URL, loginData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async signUpUser(loginData: LoginInterface): Promise<LoginInterface> {
        try {
            const response = await axios.post(URLSignUp, loginData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
