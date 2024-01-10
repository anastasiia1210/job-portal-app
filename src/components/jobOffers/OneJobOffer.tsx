import {useEffect, useState} from "react";
import JobOfferInterface from "../../interfaces/JobOfferInterface";
import {JobOfferService} from "../../services/JobOfferService";
import {DateService} from "../../services/DateService";
import './JobOffers.scss'

function OneJobOffer({id}) {
    const [jobOffer, setJobOffer] = useState<JobOfferInterface>();

    useEffect(() => {
        const getOneOffer = async () => {
            try {
                const response = await new JobOfferService().getOneOffer(id);
                setJobOffer(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };

        getOneOffer();
    }, []);
    return (
        <div className='jobOffer-main-div'>
                <div className='jobOffer-div' key={jobOffer?.id}>
                    <div className='jobOffer-text'>
                        <h1  className='jobOffer-name'>{jobOffer?.name}</h1>
                        <p  className='jobOffer-salary'>{jobOffer?.salary} грн</p>
                        <p  className='jobOffer-city'> {jobOffer?.city}</p>
                        <p  className='jobOffer-city'> {jobOffer?.militaryWork ? 'Військова професія' : 'Не військова професія'}</p>
                        <p  className='jobOffer-category'>Категорія: {jobOffer?.category.name}</p>
                        <p  className='jobOffer-company'>Підрозділ: {jobOffer?.company.name}</p>
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
                        <button className='request-button'>Відгукнутися</button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default OneJobOffer;
