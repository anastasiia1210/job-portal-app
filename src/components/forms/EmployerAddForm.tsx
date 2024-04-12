import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import './EmployerAddForm.scss'
import {useForm} from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom';
import {CreateEmployerInterface} from "../../interfaces/EmployerInterface";
import CompanyInterface from "../../interfaces/CompanyInterface";
import {CompanyService} from "../../services/CompanyService";
import CompanyAddForm from "../companies/CompanyAddForm";
import {EmployerService} from "../../services/EmployerService";

function EmployerAddForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const [employer, setEmployer] = useState<CreateEmployerInterface>();
    const [companies, setCompanies] = useState<CompanyInterface[]>([]);
    const [isCompanyAddFormVisible, setCompanyAddFormVisible] = useState(false);

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
    }, [isCompanyAddFormVisible]);

    const onSubmit = async (data) => {
        try {
            data.email = localStorage.getItem('email')
            data.password = localStorage.getItem('password')
            const res= await new EmployerService().createEmployer(data);
            console.log(data)
            navigate(`/`);
        } catch (error) {
            toast.error('Error adding employer:', error.message);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false}/>
            <div className="container form-container">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col main-div">

                        <div className="text-right">
                            <div className="input-group">
                                <label>Ім'я</label>
                                <input
                                    className="my-input"
                                    name="firstName"
                                    {...register('firstName', { required: true })}
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="input-group">
                                <label>Прізвище</label>
                                <input
                                    className="my-input"
                                    name="lastName"
                                    {...register('lastName', { required: true })}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="input-group">
                                <label>Телефон</label>
                                <input
                                    className="my-input"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Phone Number"
                                    {...register('phoneNumber', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Посада</label>
                                <input
                                    className="my-input"
                                    name="position"
                                    placeholder="Position"
                                    {...register('position', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="role">Підрозділ:</label>
                                <select className="my-input" id="companyId" onChange={(e) => setValue('companyId', e.target.value)}>
                                    <option value=""></option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="register_company">
                                <label htmlFor="role">Вашого підрозділу ще немає на сайті?</label>
                                <button onClick={()=>setCompanyAddFormVisible(true)}>Зареєструвати</button>
                            </div>
                        </div>
                        <div className='button-div'>
                            <button className="btn btn-primary" type="submit">Зберегти</button>
                        </div>
                    </div>
                </form>
            </div>
            <CompanyAddForm trigger={isCompanyAddFormVisible} setTrigger={setCompanyAddFormVisible}/>
        </>
    );
}

export default EmployerAddForm;
