import './JobOffers.scss'
import {useEffect, useState} from "react";
import JobOfferInterface from "../../interfaces/JobOfferInterface";
import {JobOfferService} from "../../services/JobOfferService";
import {Link} from "react-router-dom";

function JobOffers() {
    const [jobOffers, setJobOffers] = useState<JobOfferInterface[]>([]);

    useEffect(() => {
        const getAllOffers = async () => {
            try {
                const response = await new JobOfferService().getAllOffers();
                setJobOffers(response);
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };

        getAllOffers();
    }, []);
    return (
        <>
            <div className='jobOffers-main-div'>
                {jobOffers.map((jobOffer) => (
                <div className='jobOffers-div' key={jobOffer.id}>
                    <div className='jobOffer-text'>
                        <Link to={`/job-offer/${jobOffer.id}`} className='name' > {jobOffer.name} </Link>
                    <p>{jobOffer.salary} грн</p>
                    <p>{jobOffer.city}</p>
                    <p>{jobOffer.description}</p>
                    </div>
                    <div className='jobOffer-img'>
                        <img src={jobOffer.company.image}/>
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}

export default JobOffers
