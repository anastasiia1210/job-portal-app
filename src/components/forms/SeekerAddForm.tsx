import React, {useEffect, useState} from 'react';
import {SeekerService} from "../../services/SeekerService";
import {toast, Toaster} from "react-hot-toast";
import './SeekerEditForm.scss'
import SeekerInterface from "../../interfaces/SeekerInterface";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {CloudinaryService} from "../../services/CloudinaryService";

function SeekerAddForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const [seeker, setSeeker] = useState<SeekerInterface>();
    const [image, setImage] = useState();

    function handleUpload(e) {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        console.log(selectedFile);
    }

    const onSubmit = async (data) => {
        console.log(data)
        try {
            data.image = "https://res.cloudinary.com/dywclts4f/image/upload/v1705358110/ozpvpe58fseuxoovvl7f.webp"
            if(image && !data.image) {
                data.image = await CloudinaryService.upload(image);
            }
            data.email = localStorage.getItem('email')
            data.password = localStorage.getItem('password')
            const res= await SeekerService.addSeeker(data);
            navigate(`/`);
        } catch (error) {
            toast.error('Error adding seeker:', error.message);
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
                                    className="form-control"
                                    name="firstName"
                                    {...register('firstName', { required: true })}
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="input-group">
                                <label>Прізвище</label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    {...register('lastName', { required: true })}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="input-group">
                                <label>Телефон</label>
                                <input
                                    className="form-control"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Phone Number"
                                    {...register('phoneNumber', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Місто</label>
                                <input
                                    className="form-control"
                                    name="city"
                                    placeholder="City"
                                    {...register('city', { required: true })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Дата народження</label>
                                <input
                                    className="form-control"
                                    {...register('birthday', { required: true })}
                                    type="date"
                                    placeholder="Birthday"
                                />
                            </div>
                            <div className="input-group">
                                <label>Стать</label>
                                <select className="form-select" name="gender" {...register('gender', { required: true })}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Телеграм</label>
                                <input
                                    className="form-control"
                                    name="telegram"
                                    placeholder="Telegram"
                                    {...register('telegram')}
                                />
                            </div>
                            <div className="input-group military">
                                <label className="form-check-label" htmlFor="militaryExperience">
                                    Військовий досвід
                                </label>
                                <input
                                    className="checkbox-military"
                                    name="militaryExperience"
                                    {...register('militaryExperience')}
                                    type="checkbox"
                                />

                                <label className="form-check-label" htmlFor="militaryWork">
                                    Військова служба
                                </label>
                                <input
                                    className="checkbox-military"
                                    name="militaryWork"
                                    {...register('militaryWork')}
                                    type="checkbox"
                                />
                            </div>
                            <div className='input-group upload-photo'>
                            <label>Додати фото</label>
                            <input
                                className="form-control form-control-sm"
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
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

export default SeekerAddForm;
