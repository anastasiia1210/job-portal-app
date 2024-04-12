import '../cv/CVForm.scss'
import React, {useEffect, useState} from "react";
import {CVService} from "../../services/CVService";
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {CVInterface} from "../../interfaces/CVInterface";
import {JobRequestService} from "../../services/JobRequestService";
import {Link} from "react-router-dom";

function JobRequestAddForm(props) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [cvs, setCVs] = useState<CVInterface[]>([]);

    useEffect(() => {
        const getAllCV = async () => {
            try {
                const response = await CVService.getAllCvsOneSeeker(localStorage.id);
                setCVs(response);
            } catch (error) {
                toast.error('Error fetching categories:', error);
            }
        };
        getAllCV();
    }, []);

    const handleCloseForm = () => {
        props.setTrigger(false);
        reset();
    };
    const onSubmit = async (data) => {
        data.seekerId = localStorage.id
        data.jobOfferId = props.jobOffer.id
        console.log(data)
        console.log(data)
        try {
            const response = await JobRequestService.createJobRequest(data);
            console.log("response");
            console.log(response);
            handleCloseForm();
        } catch (error) {
            toast.error('Error fetching categories:', error);
        }

    };

    return (props.trigger) ? (
        <div className='background-form'>
            <div className='cv-form-div'>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <p className="cross" onClick={handleCloseForm}>&times;</p>
                    <div className="container">
                        <p className="form-title">{props.jobOffer.name}</p>
                        {cvs.length == 0 ? (<><p>На данний момент у вас немає резюме  <Link to="/cv"><b>Створити</b></Link></p></>):(
                        <div className="form-group">
                            <label htmlFor="categorySelect">Оберіть резюме</label>
                            <select className="form-control" id="categorySelect" {...register('cvId', { required: true })}>
                                {cvs.map((cv) => (
                                    <option key={cv.id} value={cv.id}>{cv.name}</option>
                                ))}
                            </select>
                        </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="experienceTextarea">Опишіть чому саме ви є найкращою кандидатурою</label>
                            <textarea className="form-control" id="experienceTextarea" {...register('text', { required: false })}></textarea>
                        </div>

                    <button type="submit" className="submit">Подати заявку</button>
                    </div>
                </form>
            </div>
        </div>
    ):"";
}

export default JobRequestAddForm;
