import {useEffect, useState} from "react";
import './Notifications.scss'
import {toast, Toaster} from "react-hot-toast";
import NotificationInterface from "../../interfaces/NotificationInterface";
import {NotificationService} from "../../services/NotificationService";
import {DateService} from "../../services/DateService";
import {Link} from "react-router-dom";

function Notifications(){
    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

    useEffect(() => {
        const getAllNotifications = async () => {
            try {
                const response = await NotificationService.getAllNotificationsOneSeeker(localStorage.id);
                setNotifications(response);
                console.log(response)
            } catch (error) {
                toast.error('Error fetching job requests:', error);
            }
        };
        getAllNotifications();
    }, []);
    return(
        <>
        <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='notifications-main-div'>
                {notifications.length === 0 ? (<div></div>) :
                (notifications.map((notification) => (
            <div className='notification-div' key={notification.id}>
                    <Link to={`/request/${notification.jobRequest.id}`} className='name' >
                    {notification.text}
                    </Link>
                <p>{DateService.formatDateTimeToString(notification.postingDate.toString())}</p>
            </div>
            )))}
            </div>
            </>
    )
}
export default Notifications;
