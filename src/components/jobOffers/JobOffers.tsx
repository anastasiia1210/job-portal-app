import './JobOffers.scss'
import {useEffect, useState} from "react";
import JobOfferInterface from "../../interfaces/JobOfferInterface";
import {JobOfferService} from "../../services/JobOfferService";
import {Link} from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";
import FilterJobOffers from "../filter/FilterJobOffers";
import {DateService} from "../../services/DateService";

function JobOffers() {
    const [jobOffers, setJobOffers] = useState<JobOfferInterface[]>([]);
    const [filteredOffers, setFilteredOffres] = useState<JobOfferInterface[]>([]);
    const [cityFilter, setCityFilter]=useState('');
    const [categoryFilter, setCategoryFilter]=useState('');
    const [companyFilter, setCompanyFilter]=useState('');
    const [militaryWorkFilter, setMilitaryWorkFilter]=useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const getAllOffers = async () => {
            try {
                const response = await JobOfferService.getAllOffers();
                setJobOffers(response);
                //setFilteredOffres(response);
            } catch (error) {
                toast.error('Error fetching job offers:', error);
            }
        };
        getAllOffers();
    }, []);

    useEffect(() => {
        const filtered = jobOffers.filter((offer) => {
            const matchCity = !cityFilter || offer.city.toLowerCase().includes(cityFilter.toLowerCase());
            const matchCategory = !categoryFilter || offer.category.id.includes(categoryFilter);
            const matchCompany = !companyFilter || offer.company.id.includes(companyFilter);
            const matchMilitaryWork = !militaryWorkFilter || offer.militaryWork === militaryWorkFilter;

            return matchCity && matchCategory && matchCompany && matchMilitaryWork;
        }).sort((a, b) => {
            // Assuming dateTime is a Date object property
            return new Date(b.postingDate).getTime() - new Date(a.postingDate).getTime();
        });
        setFilteredOffres(filtered);
        handleSearch();
    }, [jobOffers, cityFilter, categoryFilter, companyFilter, militaryWorkFilter, searchInput]);

    const handleSearch = () => {
        if (searchInput.length > 0) {
            const searchResults = filteredOffers.filter((offer) =>
                offer.name.toLowerCase().includes(searchInput.toLowerCase())
            );

            setFilteredOffres(searchResults);
        }
    };


    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <FilterJobOffers cityFilter={cityFilter} setCityFilter={setCityFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                             companyFilter={companyFilter} setCompanyFilter={setCompanyFilter} militaryWorkFilter={militaryWorkFilter} setMilitaryWorkFilter={setMilitaryWorkFilter}
                             searchInput={searchInput} setSearchInput={setSearchInput} handleSearch={handleSearch}/>
            <div className='jobOffers-main-div'>
                {filteredOffers.map((jobOffer) => (
                <div className='jobOffers-div' key={jobOffer.id}>
                    <div className='jobOffer-text'>
                        <Link to={`/job-offer/${jobOffer.id}`} className='name' > {jobOffer.name} </Link>
                    <p>Зарплата: {jobOffer.salary} грн</p>
                    <p>Місто: {jobOffer.city}</p>
                    <p>{jobOffer.description}</p>
                        <p className='jobOffer-postingDate'>{DateService.formatDateTimeToString(jobOffer?.postingDate.toString())}</p>

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

export default JobOffers;
