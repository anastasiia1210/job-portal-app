import {useEffect, useState} from "react";
import CompanyInterface from "../../interfaces/CompanyInterface";
import {CompanyService} from "../../services/CompanyService";
import './Companies.scss'
import {Link} from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";

function Companies() {
    const [companies, setCompanies] = useState<CompanyInterface[]>([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const response = await new CompanyService().getAllCompanies();
                setCompanies(response);
            } catch (error) {
                toast.error('Error fetching companies:', error);
            }
        };

        getAllCompanies();
    }, []);
    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='companies-main-div'>
                {companies.map((company) => (
                <div className='company-div'>
                    <div className='company-img'>
                        <img src={company.image}/>
                    </div>
                    <div className='company-text'>
                        <Link to={`/company/${company.id}`} className='name' > {company.name} </Link>
                    </div>
                </div>
                    ))}
            </div>
        </>
    )
}

export default Companies;
