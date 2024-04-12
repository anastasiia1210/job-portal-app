import './CompanyForm.scss'
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {CloudinaryService} from "../../services/CloudinaryService";
import {CompanyService} from "../../services/CompanyService";

function CompanyEditForm(props) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [file, setFile] = useState();

    const handleCloseForm = () => {
        props.setTrigger(false);
        reset();
    };
    const onSubmit = async (data) => {
        for (const key in data) {
            if (data[key] === '') {
                delete data[key];
            }
        }
        if(file && !data.image) {
            data.image = await CloudinaryService.upload(file);
        }
        console.log(data)
        try {
            const response = await new CompanyService().updateCompany(props.company.id, data);
            console.log("response");
            console.log(response);
            handleCloseForm();
        } catch (error) {
            toast.error('Error fetching categories:', error);
        }
    };

    function handleUpload(e) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
    }

    return (props.trigger) ? (
        <div className='background-form'>
            <div className='cv-form-div'>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <p className="cross" onClick={handleCloseForm}>&times;</p>
                    <div className="container">
                        <p className="form-title">Підрозділ</p>

                        <div className="form-group">
                            <label htmlFor="inputField">Назва</label>
                            <input type="text" className="form-control" id="inputField" {...register('name', { required: true })}  defaultValue={props.company.name}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="experienceTextarea">Email</label>
                            <input type="email" className="form-control" id="inputField" {...register('email', { required: true })} defaultValue={props.company.email}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputField">Телефон</label>
                            <input type="text" className="form-control" id="inputField" {...register('phoneNumber', { required: true })} defaultValue={props.company.phoneNumber}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputField">Телеграм</label>
                            <input type="text" className="form-control" id="inputField" {...register('telegram', { required: true })} defaultValue={props.company.telegram}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputField">Місто</label>
                            <input type="text" className="form-control" id="inputField" {...register('city', { required: true })} defaultValue={props.company.city}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputField">Опис</label>
                            <textarea className="form-control" id="inputField" {...register('description', { required: false })} defaultValue={props.company.description}></textarea>
                        </div>

                        <div className="form-group edit-image">
                            <label>Змінити фото</label>
                            <input
                                className="form-control form-control-sm upload-img"
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                            />
                            <span className='delete-image' onClick={() => setValue('image', "https://res.cloudinary.com/dywclts4f/image/upload/v1704558070/nglhxrdfdz1liztdgmow.png")}>Видалити фото</span>
                        </div>
                    </div>
                    <button type="submit" className="submit">
                        Редагувати
                    </button>
                </form>
            </div>
        </div>
    ):"";
}

export default CompanyEditForm;
