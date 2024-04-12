import React, {useEffect, useState} from 'react';
import {SeekerService} from "../../services/SeekerService";
import {toast, Toaster} from "react-hot-toast";
import './SeekerEditForm.scss'
import SeekerInterface from "../../interfaces/SeekerInterface";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {CloudinaryService} from "../../services/CloudinaryService";

function SeekerEditForm({id}) {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const [seeker, setSeeker] = useState<SeekerInterface>();
    const [image, setImage] = useState();

    useEffect(() => {
        const getOneSeeker = async () => {
            try {
                const response = await SeekerService.getOneSeeker(id);
                setSeeker(response);
                console.log('response')
                console.log(response);
            } catch (error) {
                toast.error('Error fetching seeker:', error);
            }
        };
        getOneSeeker();
    }, []);

    function handleUpload(e) {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        console.log(selectedFile);
    }

    const onSubmit = async (data) => {
        try {
            console.log("data")
            console.log(data)
            for (const key in data) {
                if (data[key] === '') {
                    delete data[key];
                }
            }
            if(image && !data.image) {
                data.image = await CloudinaryService.upload(image);
            }
            console.log(data)
            await SeekerService.updateSeeker(id, data);
            navigate(`/seeker/data/${localStorage.id}`);
        } catch (error) {
            console.error('Error updating seeker:', error);
            toast.error('Error updating seeker:', error.message);
        }
    };

    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className="container form-container">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col main-div">

                            <div className="img-uploaderimg">
                            <img className="avatar" src={seeker?.image} alt="User Avatar" />
                                <label>Змінити фото</label>
                                <input
                                    className="form-control form-control-sm"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                                <span className='delete-image' onClick={() => setValue('image', "https://res.cloudinary.com/dywclts4f/image/upload/v1705358110/ozpvpe58fseuxoovvl7f.webp")}>Видалити фото</span>
                            </div>

                        <div className="text-right">
                            <div className="input-group">
                                <label>Ім'я</label>
                                <input
                                    className="form-control"
                                    name="firstName"
                                    {...register('firstName')}
                                    placeholder="First Name"
                                    defaultValue={seeker?.firstName}
                                />
                            </div>
                            <div className="input-group">
                                <label>Прізвище</label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    {...register('lastName')}
                                    placeholder="Last Name"
                                    defaultValue={seeker?.lastName}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email"
                                    defaultValue={seeker?.email}
                                />
                            </div>
                            <div className="input-group">
                                <label>Телефон</label>
                                <input
                                    className="form-control"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Phone Number"
                                    defaultValue={seeker?.phoneNumber}
                                    {...register('phoneNumber')}
                                />
                            </div>
                            <div className="input-group">
                            <label>Місто</label>
                            <input
                                className="form-control"
                                name="city"
                                placeholder="City"
                                defaultValue={seeker?.city}
                                {...register('city')}
                            />
                            </div>
                            <div className="input-group">
                            <label>Дата народження</label>
                            <input
                                className="form-control"
                                {...register('birthday')}
                                type="date"
                                placeholder="Birthday"
                                defaultValue={seeker?.birthday ? new Date(seeker.birthday).toISOString().substring(0, 10) : ""}
                            />
                            </div>
                            <div className="input-group">
                            <label>Стать</label>
                            <select className="form-select" name="gender" value={seeker?.gender} onChange={(e) => setValue('gender', e.target.value)}>
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
                                    defaultValue={seeker?.telegram}
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
                                    defaultChecked={seeker?.militaryExperience}
                                />

                                <label className="form-check-label" htmlFor="militaryWork">
                                    Військова служба
                                </label>
                                <input
                                    className="checkbox-military"
                                    name="militaryWork"
                                    {...register('militaryWork')}
                                    type="checkbox"
                                    defaultChecked={seeker?.militaryWork}
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

export default SeekerEditForm;
