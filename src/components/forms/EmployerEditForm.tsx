import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import './EmployerAddForm.scss'
import {useForm} from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom';
import {EmployerInterface} from "../../interfaces/EmployerInterface";
import CompanyAddForm from "../companies/CompanyAddForm";
import {EmployerService} from "../../services/EmployerService";

function EmployerEditForm({id}) {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const [employer, setEmployer] = useState<EmployerInterface>();
    const [isCompanyAddFormVisible, setCompanyAddFormVisible] = useState(false);

    useEffect(() => {
        const getOneEmployer = async () => {
            try {
                const response = await new EmployerService().getEmployerById(id);
                setEmployer(response);
            } catch (error) {
                toast.error('Error fetching employers:', error);
            }
        };
        getOneEmployer();
    }, []);

    const onSubmit = async (data) => {
        try {
            for (const key in data) {
                if (data[key] === '') {
                    delete data[key];
                }
            }
            console.log(data)
            const res= await new EmployerService().updateEmployer(id, data);
            console.log(res)
            navigate(`/employer/data/${id}`);
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
                                    {...register('firstName')}
                                    defaultValue={employer?.firstName}
                                />
                            </div>
                            <div className="input-group">
                                <label>Прізвище</label>
                                <input
                                    className="my-input"
                                    name="lastName"
                                    {...register('lastName')}
                                    defaultValue={employer?.lastName}
                                />
                            </div>
                            <div className="input-group">
                                <label>Телефон</label>
                                <input
                                    className="my-input"
                                    name="phoneNumber"
                                    type="tel"
                                    {...register('phoneNumber')}
                                    defaultValue={employer?.phoneNumber}
                                />
                            </div>
                            <div className="input-group">
                                <label>Посада</label>
                                <input
                                    className="my-input"
                                    name="position"
                                    {...register('position')}
                                    defaultValue={employer?.position}
                                />
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

export default EmployerEditForm;
