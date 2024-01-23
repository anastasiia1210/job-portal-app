import './Companies.scss'
import {useEffect, useState} from "react";
import CompanyInterface from "../../interfaces/CompanyInterface";
import {CompanyService} from "../../services/CompanyService";
import { Toaster, toast } from 'react-hot-toast';
import {DateService} from "../../services/DateService";

function OneCompany({id}) {
    const [company, setCompany] = useState<CompanyInterface>();

            useEffect(() => {
                const getOneCompany = async () => {
                try {
                const response = await new CompanyService().getOneCompany(id);
                setCompany(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching job offers:', error);
            }
            };
                getOneCompany();
            }, []);
            return (
                <div className='one-company-main-div'>
                    <Toaster position="bottom-left" reverseOrder={false}/>
                    <div className='one-company-div' key={company?.id}>
                        <div className='one-company-text'>
                            <h1 className='one-company-name'>{company?.name}</h1>
                            <div className='company-img-text'>
                                <div className='company-image'>
                            <img src={company?.image}/>
                                </div>
                                <div className='company-info'>
                            <p  className='one-company-city'>Місто: {company?.city}</p>
                            <p  className='one-company-phone'>Телефон: {company?.phoneNumber}</p>
                            <p  className='one-company-email'>Email: {company?.email}</p>
                            <p  className='one-company-telegram' >Telegram: <a href={`https://t.me/${company?.telegram}`} target="_blank" rel="noopener noreferrer">{company?.telegram}</a></p>
                                </div>
                            </div>
                            <p  className='one-company-description'>{company?.description}</p>
                            <div className='request-button-div'>
                                <button className='request-button'>Відгукнутися</button>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default OneCompany;
