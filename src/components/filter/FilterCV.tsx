import './FilterJobOffers.scss'
import {useEffect, useState} from "react";
import JobCategoryInterface from "../../interfaces/JobCategoryInterface";
import {toast, Toaster} from "react-hot-toast";
import {JobCategoryService} from "../../services/JobCategoryService";
import {JobOfferService} from "../../services/JobOfferService";

function FilterCV({ cityFilter, setCityFilter, categoryFilter, setCategoryFilter,
                             militaryWorkFilter, setMilitaryWorkFilter, searchInput, setSearchInput, handleSearch}) {
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState<JobCategoryInterface[]>([]);
    const [localInput, setLocalInput] = useState('');

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

    const resetFilters = () => {
        setLocalInput('');
        setSearchInput('');
        setCityFilter('');
        setCategoryFilter('');
        setMilitaryWorkFilter(false);
    };

    useEffect(() => {
        setLocalInput(localStorage.getItem('searchInput'));
        getAllCategories();
        getAllCities();
    }, []);

    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='job-offers cv-filter'>
                <div className='search-job-offer-div'>
                    <input className='search-job-offer-input' type='search' placeholder="Пошук"  value={localInput} onChange={(event)=>setLocalInput(event.target.value)} />
                    <button className='search-job-offer-button' onClick={() => { setSearchInput(localInput); handleSearch();}}>Пошук</button>
                </div>

                <div className='filter-job-offer-div'>
                    <select onChange={(event)=>setCityFilter(event.target.value)} value={cityFilter} >
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

                    <input type='checkbox' name='military-work' checked={militaryWorkFilter} onChange={(event)=>setMilitaryWorkFilter(event.target.checked)}/>
                    <label htmlFor='military-work' style={{ marginLeft: '8px' }}>Військова служба</label>
                    <span className='reset-filters' onClick={resetFilters}>Скинути фільтри</span>
                </div>
            </div>
        </>
    );
}

export default FilterCV;
