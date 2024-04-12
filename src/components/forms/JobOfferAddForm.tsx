import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import './JobOfferAddForm.scss'
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {EmployerService} from "../../services/EmployerService";
import {JobCategoryService} from "../../services/JobCategoryService";
import JobCategoryInterface from "../../interfaces/JobCategoryInterface";
import {JobOfferService} from "../../services/JobOfferService";

function JobOfferAddForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const [companyId, setCompanyId] = useState("");
    const [categories, setCategories] = useState<JobCategoryInterface[]>([]);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await JobCategoryService.getAllCategories();
                setCategories(response);
            } catch (error) {
                toast.error('Error fetching companies:', error);
            }
        };

        const getCompanyId = async () => {
            try {
                const employer = await new EmployerService().getEmployerById(localStorage["id"]);
                setCompanyId(employer.company.id);
            } catch (error) {
                toast.error('Error fetching companies:', error);
            }
        };
        getAllCategories();
        getCompanyId();
    }, []);

    const onSubmit = async (data) => {
        try {
            data.companyId = companyId;
            const result= await JobOfferService.createOffer(data);
            console.log(result)
            navigate(`/`);
        } catch (error) {
            toast.error('Error adding employer:', error.message);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false}/>
            <div className="container form-container container-job-offer">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col main-div">

                        <div className="text-right">
                            <div className="input-group">
                                <label>Назва</label>
                                <input
                                    className="my-input"
                                    name="name"
                                    {...register('name', { required: true })}
                                    placeholder="Назва"
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="role">Категорія</label>
                                <select className="my-input" id="categoryId" onChange={(e) => setValue('categoryId', e.target.value)}>
                                    <option value=""></option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Зарплата</label>
                                <input
                                    className="my-input"
                                    name="salary"
                                    type="number"
                                    placeholder="Зарплата"
                                    {...register('salary', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Місто</label>
                                <input
                                    className="my-input"
                                    name="city"
                                    {...register('city', { required: true })}
                                    placeholder="Місто"
                                />
                            </div>
                            <div className="input-group">
                                <label>Опис</label>
                                <textarea
                                    className="my-input"
                                    name="description"
                                    placeholder="Опис"
                                    {...register('description', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Обов'язки</label>
                                <textarea
                                    className="my-input"
                                    name="duties"
                                    placeholder="Опис"
                                    {...register('duties', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Вимоги</label>
                                <textarea
                                    className="my-input"
                                    name="requirements"
                                    placeholder="Вимоги"
                                    {...register('requirements', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Умови</label>
                                <textarea
                                    className="my-input"
                                    name="conditions"
                                    placeholder="Умови"
                                    {...register('conditions', { required: true })}
                                />
                            </div>
                            <div className="military-work">
                                <label>Військова служба</label>
                                <input
                                    type="checkbox"
                                    name="militaryWork"
                                    {...register('militaryWork')}
                                />
                            </div>
                        </div>
                        <div className='button-div'>
                            <button className="btn btn-primary" type="submit">Зберегти</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default JobOfferAddForm;
