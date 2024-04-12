import axios, {AxiosResponse} from "axios";
import NotificationInterface, {CreateNotificationInterface} from "../interfaces/NotificationInterface";

const URL = 'http://localhost:5555/notification';
export class NotificationService {
    static async getAllNotificationsOneSeeker(id: string): Promise<NotificationInterface[]> {
        const urlId = `${URL}/seeker/${id}`;
        try {
            const response: AxiosResponse<NotificationInterface[]> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }

    static async createNotification(data: CreateNotificationInterface): Promise<NotificationInterface[]> {
        try {
            const response: AxiosResponse<NotificationInterface[]> = await axios.post(URL, data);
            return response.data;
        } catch (error) {
            console.error('Error create notifications:', error);
            throw error;
        }
    }
}
