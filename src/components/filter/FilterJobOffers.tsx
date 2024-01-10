import './FilterJobOffers.scss'
import {useState} from "react";

function FilterJobOffers() {
    // Стани для варіантів випадаючих списків
    const [cities, setCities] = useState(['Місто', 'Київ', 'Харків', 'Львів', 'Одеса', 'Дніпро', 'Запоріжжя', 'Івано-Франківськ', 'Чернівці', 'Тернопіль']);

    const [categories, setCategories] = useState([
        'Категорія',
        'Стрілецька справа yegfusgde ufdfidsh',
        'Морська',
        'Танкова армія',
        'Артилерія',
        'Повітряні сили',
        'Розвідка',
        'Піхота',
        'Кібервійська справа',
        'Інженерна армія'
    ]);

    const [units, setUnits] = useState([
        'Збройгі сили Укрїни ',
        'ЕКСЛТ',
        'ВОВКИ',
        'Гайдамаки',
        'Козаки',
        'Сокіл',
        'Беркут',
        'Джура',
        'Світязь',
        'Аєро'
    ]);

    return (
        <>
            <div className='job-offers'>
                <div className='search-job-offer-div'>
                    <input className='search-job-offer-input' type='search' placeholder="Пошук" />
                    <button className='search-job-offer-button'>Пошук</button>
                </div>

                <div className='filter-job-offer-div'>
                    <select>
                        {cities.map((city, index) => (
                            <option key={index} value={index}>{city}</option>
                        ))}
                    </select>

                    <select>
                        {categories.map((category, index) => (
                            <option key={index} value={index}>{category}</option>
                        ))}
                    </select>

                    <select>
                        {units.map((unit, index) => (
                            <option key={index} value={index}>{unit}</option>
                        ))}
                    </select>

                    <input type='checkbox' name='military-work' />
                    <label htmlFor='military-work'>Військова служба</label>

                    <span className='reset-filters'>Скинути фільтри</span>
                </div>
            </div>
        </>
    );
}

export default FilterJobOffers;
