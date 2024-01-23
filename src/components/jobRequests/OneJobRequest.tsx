import {useEffect, useState} from "react";
import CVInterface from "../../interfaces/CVInterface";
import {CVService} from "../../services/CVService";
import {toast, Toaster} from "react-hot-toast";
import jobRequestInterface from "../../interfaces/JobRequestInterface";
import {JobRequestService} from "../../services/JobRequestService";
import {DateService} from "../../services/DateService";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function OneJobRequest({id}) {
    const [jobRequest, setJobRequest] = useState<jobRequestInterface>();

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
    return(
        <div className='one-jobRequest-main-div'>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='one-jobRequest-div' >
                <div className='one-jobRequest-text'>
                    <h2 className='green-text' style={{ margin: 0 }}>Вакансія</h2>
                    <Link to={`/job-offer/${jobRequest?.jobOffer.id}`}><h1>{jobRequest?.jobOffer.name}</h1></Link>
                    <p>Зарплата: {jobRequest?.jobOffer.salary}</p>
                    <p>Місто: {jobRequest?.jobOffer.city}</p>
                    <hr/>
                    <h2 className='green-text'>Статус відгука</h2>
                    {jobRequest?.status === true && (<><p className='status-yes'>Підтверджено</p>
                        <p>Вашу заявку прийнято, найближчим часом з вами зв'яжуться. </p></>)}
                    {jobRequest?.status === false && (<><p className='status-no'>Відхилено</p>
                    <p>На жаль вашу заявку відхилили.</p></>)}
                    <hr/>
                    <h2>Чим відгукнулись</h2>
                    <p  className='jobOffer-description'>Резюме <Link to={`/cv/${jobRequest?.cv?.id}`}>{jobRequest?.cv?.name}</Link></p>
                    <p>{jobRequest?.text}</p>
                    <div className='request-date'>
                        <p className='postingDate'>{DateService.formatDateTimeToString(jobRequest?.postingDate.toString())}</p>
                        <button className='request-button' >Редагувати</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OneJobRequest;
