import {useEffect, useState} from "react";
import './JobRequests.scss'
import {toast, Toaster} from "react-hot-toast";
import {JobRequestInterface} from "../../interfaces/JobRequestInterface";
import {JobRequestService} from "../../services/JobRequestService";
import {DateService} from "../../services/DateService";
import {Link} from "react-router-dom";

function JobRequests({id}){
    const [jobRequests, setJobRequests] = useState<JobRequestInterface[]>([]);

    const getAllRequestsOneSeeker = async () => {
        try {
            const response = await JobRequestService.getAllRequestsOneSeeker(localStorage.id);
            setJobRequests(response);
        } catch (error) {
            toast.error('Error fetching job requests:', error);
        }
    };
    const getAllRequestsOneJobOffer = async () => {
        try {
            console.log(id);
            const response = await JobRequestService.getAllRequestsJobOffer(id);
            setJobRequests(response);
        } catch (error) {
            toast.error('Error fetching job requests:', error);
        }
    };

    useEffect(() => {
        if(localStorage["role"] == "seeker"){
            getAllRequestsOneSeeker();
        }
        if(localStorage["role"] == "employer"){
            getAllRequestsOneJobOffer();
        }
    }, []);
    return(
       <>
           <Toaster position="bottom-left" reverseOrder={false}/>
           <div className='jobRequest-main-div'>
               {jobRequests.length === 0 ? (
                   <div></div>
               ) : (
                   jobRequests.map((jobRequest) => (
                       <div className={`jobRequest-div ${jobRequest.status === true ? 'green-border' : (jobRequest.status === false ? 'red-border' : 'default-border')}`} key={jobRequest.id}>
                           <div className='name-status'>
                               {localStorage["role"]=="employer" && <Link to={`/request/${jobRequest.id}`} className='name' > {jobRequest.seeker.firstName} {jobRequest.seeker.lastName}</Link>}
                               {localStorage["role"]=="seeker" && <Link to={`/request/${jobRequest.id}`} className='name' > {jobRequest.jobOffer.name} </Link>}
                           {jobRequest.status === true && (<p className='status-yes'>Підтверджено</p>)}
                           {jobRequest.status === false && (<p className='status-no'>Відхилено</p>)}
                           </div>
                           {localStorage["role"]=="seeker" &&
                           <div>
                           <p>Зарплата: {jobRequest.jobOffer.salary} грн</p>
                           <p>Місто: {jobRequest.jobOffer.city}</p>
                           </div>}
                           {localStorage["role"]=="employer" &&
                               <div>
                                   <p>{jobRequest.text}</p>
                               </div>}
                           <p>{DateService.formatDateTimeToString(jobRequest.postingDate.toString())}</p>
                       </div>
                   ))
               )}
           </div>
       </>
    )
}
export default JobRequests;
