import {useEffect, useState} from "react";
import CompanyInterface from "../../interfaces/CompanyInterface";
import {CompanyService} from "../../services/CompanyService";
import './Companies.scss'

function Companies() {
    const [companies, setCompanies] = useState<CompanyInterface[]>([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const response = await new CompanyService().getAllCompanies();
                setCompanies(response);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        getAllCompanies();
    }, []);
    return (
        <>
            <div className='companies-main-div'>
                {companies.map((company) => (
                <div className='company-div'>
                    <div className='company-img'>
                        <img src={company.image}/>
                    </div>
                    <div className='company-text'>
                        <p className='name'>{company.name}</p>
                    </div>
                </div>
                    ))}
            </div>
        </>
    )
}

export default Companies;
