import {useEffect, useState} from "react";
import JobOfferInterface from "../../interfaces/JobOfferInterface";
import {JobOfferService} from "../../services/JobOfferService";
import {DateService} from "../../services/DateService";
import './JobOffers.scss'
import {toast, Toaster} from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import JobRequestAddForm from "../jobRequests/JobRequestAddForm";

function OneJobOffer({id}) {
    const [jobOffer, setJobOffer] = useState<JobOfferInterface>();
    const [isJobRequestAddFormVisible, setIsJobRequestAddFormVisible] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const getOneOffer = async () => {
            try {
                const response = await JobOfferService.getOneOffer(id);
                setJobOffer(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching job offers:', error);
            }
        };

        getOneOffer();
    }, []);

    const deleteJobOffer = async() => {
        try {
            const response = await JobOfferService.deleteOffer(id);
            console.log(response);
            navigate('/job-offers');
        } catch (error) {
            toast.error('Error fetching job offers:', error);
        }
    };

    return (
        <div className='jobOffer-main-div'>
            <Toaster position="bottom-left" reverseOrder={false}/>
                <div className='jobOffer-div' key={jobOffer?.id}>
                    <div className='jobOffer-text'>
                        <div className="name-buttons">
                        <h1  className='jobOffer-name'>{jobOffer?.name}</h1>
                            {(localStorage["role"] == "employer") && (
                        <div>
                            <Link to={`/job-offer/edit/${id}`}><button className="btn btn-success btn-sm">Редагувати</button></Link>
                            <button className="btn btn-danger btn-sm" onClick={deleteJobOffer}>Видалити</button>
                        </div>)}
                        </div>
                        <p  className='jobOffer-salary'>Зарплата: {jobOffer?.salary} грн</p>
                        <p  className='jobOffer-city'>Місто: {jobOffer?.city}</p>
                        <p className='one-seeker-military-exp'>Тип:
                            {jobOffer?.militaryWork ? (' Військова') : (' Не військова')}</p>
                        <p  className='jobOffer-category'>Категорія: {jobOffer?.category.name}</p>
                        <p  className='jobOffer-company'>Підрозділ: <Link to={`/company/${jobOffer?.company.id}`}>{jobOffer?.company.name}</Link></p>
                        <h2>Опис</h2>
                        <p  className='jobOffer-description'>{jobOffer?.description}</p>
                        <h2>Обов'язки</h2>
                        <p  className='jobOffer-duties'>{jobOffer?.duties}</p>
                        <h2>Вимоги</h2>
                        <p  className='jobOffer-requirements'>{jobOffer?.requirements}</p>
                        <h2>Умови</h2>
                        <p className='jobOffer-conditions'>{jobOffer?.conditions}</p>
                        <div className='request-date'>
                        <p className='jobOffer-postingDate'>{DateService.formatDateTimeToString(jobOffer?.postingDate.toString())}</p>
                            {(localStorage["role"] == "seeker") && (<button className='request-button' onClick={() => setIsJobRequestAddFormVisible(true)}>Відгукнутися</button>)}
                            {(localStorage["role"] == "employer") && (<Link to={`/requests/${id}`}><button className='request-button'>Заявки</button></Link>)}
                        </div>
                    </div>
            </div>
            {(localStorage["role"] == "seeker") && <JobRequestAddForm trigger={isJobRequestAddFormVisible} setTrigger={setIsJobRequestAddFormVisible} jobOffer={jobOffer}/>}
        </div>
    );
}

export default OneJobOffer;
