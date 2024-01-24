import './FilterJobOffers.scss'
import {useEffect, useState} from "react";
import JobCategoryInterface from "../../interfaces/JobCategoryInterface";
import {toast, Toaster} from "react-hot-toast";
import {JobCategoryService} from "../../services/JobCategoryService";
import {CompanyService} from "../../services/CompanyService";
import CompanyInterface from "../../interfaces/CompanyInterface";
import {JobOfferService} from "../../services/JobOfferService";

function FilterJobOffers({ cityFilter, setCityFilter, categoryFilter, setCategoryFilter, companyFilter, setCompanyFilter,
                             militaryWorkFilter, setMilitaryWorkFilter, searchInput, setSearchInput, handleSearch}) {
    const [cities, setCities] = useState([]);

    const [categories, setCategories] = useState<JobCategoryInterface[]>([]);

    const [companies, setCompanies] = useState<CompanyInterface[]>([]);

    const getAllCities = async () => {
        try {
            const response = await JobOfferService.getAllOffers();
            const uniqueCities = Array.from(new Set(response.map(jobOffer => jobOffer.city)));
            setCities(uniqueCities);
        } catch (error) {
            toast.error('Error fetching job offers:', error);
        }
    };
    const getAllCategories = async () => {
        try {
            const response = await JobCategoryService.getAllCategories();
            setCategories(response);
        } catch (error) {
            toast.error('Error fetching cvs:', error);
        }
    };

    const getAllCompanies = async () => {
        try {
            const response = await new CompanyService().getAllCompanies();
            setCompanies(response);
        } catch (error) {
            toast.error('Error fetching companies:', error);
        }
    };

    const resetFilters = () => {
       setCityFilter('');
       setCategoryFilter('');
       setCompanyFilter('');
       setMilitaryWorkFilter(false);
       setSearchInput('');
    };

    useEffect(() => {
        getAllCategories();
        getAllCompanies();
        getAllCities();
    }, []);

    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='job-offers'>
                <div className='search-job-offer-div'>
                    <input className='search-job-offer-input' type='search' placeholder="Пошук"  value={searchInput} onChange={(event)=>setSearchInput(event.target.value)} />
                    <button className='search-job-offer-button' onClick={handleSearch}>Пошук</button>
                </div>

                <div className='filter-job-offer-div'>
                    <select onChange={(event)=>setCityFilter(event.target.value)} value={cityFilter}>
                        <option value="">Місто</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <select  onChange={(event)=>setCategoryFilter(event.target.value)} value={categoryFilter}>
                        <option value="">Категорія</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <select  onChange={(event)=>setCompanyFilter(event.target.value)} value={companyFilter}>
                        <option value="">Підрозділ</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>

                    <input type='checkbox' name='military-work' checked={militaryWorkFilter}  onChange={(event)=>setMilitaryWorkFilter(event.target.checked)}/>
                    <label htmlFor='military-work'>Військова служба</label>

                    <span className='reset-filters' onClick={resetFilters}>Скинути фільтри</span>
                </div>
            </div>
        </>
    );
}

export default FilterJobOffers;
