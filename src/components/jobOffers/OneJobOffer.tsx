import {useEffect, useState} from "react";
import JobOfferInterface from "../../interfaces/JobOfferInterface";
import {JobOfferService} from "../../services/JobOfferService";
import {DateService} from "../../services/DateService";
import './JobOffers.scss'
import {toast, Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";

function OneJobOffer({id}) {
    const [jobOffer, setJobOffer] = useState<JobOfferInterface>();

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

    const handleClick = () => {
       if (localStorage.token){
           console.log('click')
       }else{
           toast(
               "Увійдіть в акаунт",
               {
                   duration: 3000,
               });
       }
    };

    return (
        <div className='jobOffer-main-div'>
            <Toaster position="bottom-left" reverseOrder={false}/>
                <div className='jobOffer-div' key={jobOffer?.id}>
                    <div className='jobOffer-text'>
                        <h1  className='jobOffer-name'>{jobOffer?.name}</h1>
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
                        <button className='request-button' onClick={handleClick} >Відгукнутися</button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default OneJobOffer;
