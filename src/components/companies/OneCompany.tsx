import './Companies.scss'
import React, {useEffect, useState} from "react";
import CompanyInterface from "../../interfaces/CompanyInterface";
import {CompanyService} from "../../services/CompanyService";
import { Toaster, toast } from 'react-hot-toast';
import {EmployerService} from "../../services/EmployerService";
import CompanyEditForm from "./CompanyEditForm";

function OneCompany({id}) {
    const [company, setCompany] = useState<CompanyInterface>();
    const [employerCompanyId, setEmployerCompanyId] = useState("")
    const [isCompanyEditFormVisible, setCompanyEditFormVisible] = useState(false);

            useEffect(() => {
                const getOneCompany = async () => {
                try {
                const response = await new CompanyService().getOneCompany(id);
                setCompany(response);
                    console.log(localStorage["id"]);
                    console.log(localStorage["role"]);
                if(localStorage["role"] === "employer"){
                    const response = await new EmployerService().getEmployerById(localStorage["id"]);
                    setEmployerCompanyId(response.company.id);
                    console.log("company id");
                    console.log(response.company.id);
                }
                console.log(response);
            } catch (error) {
                toast.error('Error fetching job offers:', error);
            }
            };
                getOneCompany();
            }, [isCompanyEditFormVisible]);
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
                                {(employerCompanyId === company?.id) && (<button className='request-button' onClick={()=>setCompanyEditFormVisible(true)}>Редагувати</button>)}
                            </div>
                        </div>
                    </div>
                    <CompanyEditForm trigger={isCompanyEditFormVisible} setTrigger={setCompanyEditFormVisible} company={company}/>
                </div>
    );
}

export default OneCompany;
