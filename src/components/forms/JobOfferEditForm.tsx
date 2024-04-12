import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import './JobOfferAddForm.scss'
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {EmployerService} from "../../services/EmployerService";
import {JobCategoryService} from "../../services/JobCategoryService";
import JobCategoryInterface from "../../interfaces/JobCategoryInterface";
import {JobOfferService} from "../../services/JobOfferService";
import JobOfferInterface from "../../interfaces/JobOfferInterface";

function JobOfferEditForm({id}) {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const [companyId, setCompanyId] = useState("");
    const [categories, setCategories] = useState<JobCategoryInterface[]>([]);
    const [offer, setOffer] = useState<JobOfferInterface>();

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

        const getJobRequest = async () => {
            try {
                const response = await JobOfferService.getOneOffer(id);
               setOffer(response);
            } catch (error) {
                toast.error('Error fetching offer:', error);
            }
        };

        getJobRequest();
        getAllCategories();
        getCompanyId();
    }, []);

    const onSubmit = async (data) => {
        try {
            for (const key in data) {
                if (data[key] === '') {
                    delete data[key];
                }
            }
            console.log(data)
            const result= await JobOfferService.updateOffer(id, data);
            console.log(result)
            navigate(`/job-offer/${id}`);
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
                                    {...register('name')}
                                    placeholder="Назва"
                                    defaultValue={offer?.name}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="role">Категорія</label>
                                <select className="my-input" id="categoryId" value={offer?.category.id} {...register('categoryId')} onChange={(e) => setValue('categoryId', e.target.value)}>
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
                                    {...register('salary')}
                                    defaultValue={offer?.salary}
                                />
                            </div>
                            <div className="input-group">
                                <label>Місто</label>
                                <input
                                    className="my-input"
                                    name="city"
                                    {...register('city')}
                                    placeholder="Місто"
                                    defaultValue={offer?.city}
                                />
                            </div>
                            <div className="input-group">
                                <label>Опис</label>
                                <textarea
                                    className="my-input"
                                    name="description"
                                    placeholder="Опис"
                                    {...register('description')}
                                    defaultValue={offer?.description}
                                />
                            </div>
                            <div className="input-group">
                                <label>Обов'язки</label>
                                <textarea
                                    className="my-input"
                                    name="duties"
                                    placeholder="Опис"
                                    {...register('duties')}
                                    defaultValue={offer?.duties}
                                />
                            </div>
                            <div className="input-group">
                                <label>Вимоги</label>
                                <textarea
                                    className="my-input"
                                    name="requirements"
                                    placeholder="Вимоги"
                                    {...register('requirements')}
                                    defaultValue={offer?.requirements}
                                />
                            </div>
                            <div className="input-group">
                                <label>Умови</label>
                                <textarea
                                    className="my-input"
                                    name="conditions"
                                    placeholder="Умови"
                                    {...register('conditions')}
                                    defaultValue={offer?.conditions}
                                />
                            </div>
                            <div className="military-work">
                                <label>Військова служба</label>
                                <input
                                    type="checkbox"
                                    name="militaryWork"
                                    {...register('militaryWork')}
                                    defaultChecked={offer?.militaryWork}
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

export default JobOfferEditForm;
