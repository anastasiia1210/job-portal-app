import './CVs.scss'
import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import {CVInterface} from "../../interfaces/CVInterface";
import {CVService} from "../../services/CVService";
import {Link} from "react-router-dom";
import {DateService} from "../../services/DateService";
import CVAddForm from "./CVAddForm";
import FilterCV from "../filter/FilterCV";

function CVs() {
    const [cvs, setCVs] = useState<CVInterface[]>([]);
    const [isCVAddFormVisible, setIsCVAddFormVisible] = useState(false);

    const [filteredOffers, setFilteredOffres] = useState<CVInterface[]>([]);
    const [cityFilter, setCityFilter]=useState('');
    const [categoryFilter, setCategoryFilter]=useState('');
    const [militaryWorkFilter, setMilitaryWorkFilter]=useState(false);
    const [searchInput, setSearchInput] = useState('');

        const getAllCvsOneSeeker = async () => {
            try {
                if(localStorage["role"] == "seeker") {
                    const response = await CVService.getAllCvsOneSeeker(localStorage.id);
                    setCVs(response);
                    setFilteredOffres(response);
                }
                if(localStorage["role"] == "employer") {
                    const response = await CVService.getAllCvs();
                    setCVs(response);
                }
            } catch (error) {
                toast.error('Error fetching cvs:', error);
            }
        };

    useEffect(() => {
        getAllCvsOneSeeker();

        const storedCityFilter = localStorage.getItem('cityFilter') || '';
        const storedCategoryFilter = localStorage.getItem('categoryFilter') || '';
        const storedMilitaryWorkFilter = localStorage.getItem('militaryWorkFilter') === 'true';
        const storedSearchInput = localStorage.getItem('searchInput') || '';

        setCityFilter(storedCityFilter);
        setCategoryFilter(storedCategoryFilter);
        setMilitaryWorkFilter(storedMilitaryWorkFilter);
        setSearchInput(storedSearchInput);

    }, [isCVAddFormVisible]);

    useEffect(() => {
        setFilteredOffres(filterAndSearch);
        localStorage.setItem('cityFilter', cityFilter);
        localStorage.setItem('categoryFilter', categoryFilter);
        localStorage.setItem('militaryWorkFilter', militaryWorkFilter.toString());
        localStorage.setItem('searchInput', searchInput);
    }, [cvs, cityFilter, categoryFilter, militaryWorkFilter, searchInput]);


    const filterAndSearch = () => {
        const filtered = cvs.filter((cv) => {
            const matchCity = !cityFilter || cv.seeker.city.toLowerCase().includes(cityFilter.toLowerCase());
            const matchCategory = !categoryFilter || cv.category.id.includes(categoryFilter);
            const matchMilitaryWork = !militaryWorkFilter || cv.seeker.militaryWork === militaryWorkFilter;
            const matchSearch = (
                cv.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            return matchCity && matchCategory && matchMilitaryWork && matchSearch;
        });
        const sorted = filtered.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));

        return sorted;
    };

    const handleSearch = () => {
        setFilteredOffres(filterAndSearch);
    };

    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='cvs-main-div'>
                {localStorage["role"] == "seeker" && (
                <div className="header-for-add-button">
                    <h3 className="header-text">Мої резюме</h3>
                    <button onClick={() => setIsCVAddFormVisible(true)} className="add-cv-button">Створити</button>
                </div>)}
                {localStorage["role"] == "employer" && ( <FilterCV cityFilter={cityFilter} setCityFilter={setCityFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                                                                        militaryWorkFilter={militaryWorkFilter} setMilitaryWorkFilter={setMilitaryWorkFilter}
                                                                          searchInput={searchInput} setSearchInput={setSearchInput} handleSearch={handleSearch}/>)}
                {filteredOffers.length === 0 ? (
                    <div></div>
                ) : (
                    filteredOffers.map((cv) => (
                        <div className='cv-div' key={cv.id}>
                                <Link to={`/cv/${cv.id}`} className='name' > {cv.name} </Link>
                                <p>Категорія: {cv.category.name}</p>
                                <p>{DateService.formatDateTimeToString(cv.postingDate.toString())}</p>
                        </div>
                    ))
                )}
            </div>
            <CVAddForm trigger={isCVAddFormVisible} setTrigger={setIsCVAddFormVisible}/>
        </>
    )
}

export default CVs
