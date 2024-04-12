import './CVForm.scss'
import React, {useEffect, useState} from "react";
import JobCategoryInterface from "../../interfaces/JobCategoryInterface";
import {CVService} from "../../services/CVService";
import {toast} from "react-hot-toast";
import {JobCategoryService} from "../../services/JobCategoryService";
import {useForm} from "react-hook-form";
import {CloudinaryService} from "../../services/CloudinaryService";

function CVAddForm(props) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [jobCategories, setJobCategories] = useState<JobCategoryInterface[]>([]);
    const [file, setFile] = useState();

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await JobCategoryService.getAllCategories();
                setJobCategories(response);
            } catch (error) {
                toast.error('Error fetching categories:', error);
            }
        };
        getAllCategories();
    }, []);

    const handleCloseForm = () => {
        props.setTrigger(false);
        reset();
    };
    const onSubmit = async (data) => {
        if (file){
            data.cvLink = await CloudinaryService.upload(file);
        }
        data.seekerId = localStorage.getItem("id")
        console.log(data)
        try {
            const response = await CVService.createCV(data);
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
                        <p className="form-title">Резюме</p>

                        <div className="form-group">
                            <label htmlFor="inputField">Посада, на якій хочете працювати</label>
                            <input type="text" className="form-control" id="inputField" {...register('name', { required: true })}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="categorySelect">Категорія</label>
                            <select className="form-control" id="categorySelect" {...register('categoryId', { required: true })}>
                                {jobCategories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="experienceTextarea">Досвід роботи</label>
                            <textarea className="form-control" id="experienceTextarea" {...register('experience', { required: false })}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="educationTextarea">Освіта</label>
                            <textarea className="form-control" id="educationTextarea" {...register('education', { required: false })}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="skillsTextarea">Знання і навички</label>
                            <textarea className="form-control" id="skillsTextarea" {...register('skills', { required: false })} ></textarea>
                        </div>
                        <div className="form-group">
                        <label>Додати файл резюме</label>
                        <input
                            className="form-control form-control-sm"
                            type="file"
                            accept=".pdf"
                            onChange={handleUpload}
                        />
                        </div>
                    </div>
                    <button type="submit" className="submit">
                        Створити
                    </button>
                </form>
            </div>
        </div>
    ):"";
}

export default CVAddForm;
