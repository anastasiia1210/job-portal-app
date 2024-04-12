import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import {JobRequestInterface} from "../../interfaces/JobRequestInterface";
import {JobRequestService} from "../../services/JobRequestService";
import {DateService} from "../../services/DateService";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {NotificationService} from "../../services/NotificationService";
function OneJobRequest({id}) {
    const [jobRequest, setJobRequest] = useState<JobRequestInterface>();
    const navigate = useNavigate();
    useEffect(() => {
        const getOneRequest = async () => {
            try {
                const response = await JobRequestService.getOneRequest(id);
                setJobRequest(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching job request:', error);
            }
        };

        getOneRequest();
    }, []);

    async function editStatus(status) {
        try {
            let text;
            if(status){
                text = "Вашу заявку успішно підтверджено. Скоро з вами зв'яжуться для уточнення деталей."
            }else {
                text = "На жаль, вашу заявку відхилено."
            }
            const response = await JobRequestService.updateJobRequest(jobRequest?.id, {"status": status})
            const notification = await NotificationService.createNotification(
                {"text": `${text}`, "jobRequestId": `${jobRequest?.id}`, "seekerId": `${jobRequest?.seeker.id}`})
            console.log(response);
            console.log("notification");
            console.log(notification);
        } catch (error) {
            toast.error('Error edit status job request:', error);
        }
    }

    async function deleteRequest() {
        try {
            const response = await JobRequestService.deleteRequest(jobRequest?.id);
            console.log(response);
            navigate("/requests");
        } catch (error) {
            toast.error('Error fetching job request:', error);
        }
    }

    return(
        <div className='one-jobRequest-main-div'>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='one-jobRequest-div' >
                <div className='one-jobRequest-text'>
                    {localStorage["role"] == "seeker" && (<div><Link to={`/job-offer/${jobRequest?.jobOffer.id}`}><h1 className="name">{jobRequest?.jobOffer.name}</h1></Link>
                    <p>Зарплата: {jobRequest?.jobOffer.salary}</p>
                    <p>Місто: {jobRequest?.jobOffer.city}</p>
                    </div>)}
                    {localStorage["role"] == "employer" && (<h1 className="name">{jobRequest?.seeker.firstName} {jobRequest?.seeker.lastName}</h1>)}
                    <hr/>
                    {localStorage["role"] == "seeker" && (<>
                    <h3 className='green-text'>Статус заявки</h3>
                    {jobRequest?.status === true && (<><p className='status-yes'>Підтверджено</p>
                        <p>Вашу заявку прийнято, найближчим часом з вами зв'яжуться. </p></>)}
                    {jobRequest?.status === false && (<><p className='status-no'>Відхилено</p>
                    <p>На жаль вашу заявку відхилили.</p></>)}
                    {jobRequest?.status == null && (<p>Не опрацьована</p>)}
                    <hr/>
                    </>)}
                    <h3>Чим відгукнулись</h3>
                    <p  className='jobOffer-description'>Резюме <Link to={`/cv/${jobRequest?.cv?.id}`}>{jobRequest?.cv?.name}</Link></p>
                    <p>{jobRequest?.text}</p>
                    <div className='request-date'>
                        <p className='postingDate'>{DateService.formatDateTimeToString(jobRequest?.postingDate.toString())}</p>
                        {localStorage["role"] == "seeker" && (<button className='request-button' onClick={deleteRequest}>Скасувати</button>)}
                        {localStorage["role"] == "employer" && (<div>
                            <button className="btn btn-success btn-sm" style={{ marginRight: '10px' }} onClick={() => editStatus(true)}>Прийняти</button>
                            <button className="btn btn-danger btn-sm"onClick={() => editStatus(false)}>Відхилити</button>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OneJobRequest;
