import {JobRequestInterface} from "./JobRequestInterface";
import SeekerInterface from "./SeekerInterface";

export default interface NotificationInterface {
    id: string;
    text?: string;
    postingDate: Date;
    isRead?: boolean;
    jobRequest: JobRequestInterface;
    seeker: SeekerInterface;
}

export interface CreateNotificationInterface {
    text: string;
    jobRequestId: string;
    seekerId: string;
}

