import JobRequestInterface from "./JobRequestInterface";
import SeekerInterface from "./SeekerInterface";

interface NotificationInterface {
    id: string;
    text?: string;
    postingDate: Date;
    isRead?: boolean;
    jobRequest: JobRequestInterface;
    seeker: SeekerInterface;
}

export default NotificationInterface;
