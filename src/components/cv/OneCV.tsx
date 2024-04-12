import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import {CVInterface} from "../../interfaces/CVInterface";
import {CVService} from "../../services/CVService";
import {DateService} from "../../services/DateService";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import CVEditForm from "./CVEditForm";

function OneCV({id}) {
    const [cv, setCV] = useState<CVInterface>();
    const [isCVEditFormVisible, setIsCVEditFormVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getOneCV = async() => {
            try {
                const response = await CVService.getOneCV(id);
                setCV(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching job offers:', error);
            }
        };
        getOneCV();
    }, [isCVEditFormVisible]);

    const deleteCV = async() => {
        try {
            const response = await CVService.deleteCV(id);
            setCV(response);
            console.log(response);
            navigate('/cv');
        } catch (error) {
            toast.error('Error fetching job offers:', error);
        }
    };

    const editCV = async() => {
        setIsCVEditFormVisible(true)
    };
    return (
        <>
            <div className='one-cv-main-div'>
                <Toaster position="bottom-left" reverseOrder={false}/>
                <div className='cv-div' >
                    <div className='cv-text'>
                        <div className='name-buttons'>
                        <div>
                        <h2  className='cv-name'>{cv?.name}</h2>
                        <p  className='jobOffer-salary'>Категорія: {cv?.category?.name}</p>
                        </div>
                            {localStorage["role"] == "seeker" && (
                        <div>
                            <button className="btn btn-success btn-sm" onClick={editCV}>Редагувати</button>
                            <button className="btn btn-danger btn-sm" onClick={deleteCV}>Видалити</button>
                        </div>)}
                        </div>
                        <hr/>
                        {localStorage["role"] == "employer" && (
                        <div className='seeker-information'>
                        <h2>Інформація про користувача</h2>
                        <p>{cv?.seeker.firstName} {cv?.seeker.lastName}</p>
                        <p>Місто: {cv?.seeker.city}</p>
                        <p>Вік: {DateService.getAgeByBirthday(cv?.seeker.birthday)}</p>
                            <p className='one-seeker-military-exp'>Військовий досвід:
                                {cv?.seeker.militaryExperience ? (<span> ✅</span>) : (<span> &#10060;</span>)}
                            </p>
                            <p  className='one-seeker-military-work'>Згода на військову службу:
                                {cv?.seeker.militaryWork ? (<span> ✅</span>) : (<span> &#10060;</span>)}
                            </p>
                            <p>Телефон: {cv?.seeker.phoneNumber}</p>
                            <p>Email: {cv?.seeker.email}</p>
                            <p className='one-seeker-telegram'>Telegram: <a href={`https://t.me/${cv?.seeker.telegram}`} target="_blank" rel="noopener noreferrer">{cv?.seeker.telegram}</a></p>
                            <Link to={`/seeker/data/${cv?.seeker.id}`}>
                        {/*<button className='details-button' to={`/seeker/data/${localStorage.id}`}>Детальніше</button>*/}
                            </Link>
                            <hr/>
                        </div>
                        )}

                        {cv?.experience ? (
                            <>
                                <h4>Досвід роботи</h4>
                                <p className='jobOffer-description'>{cv.experience}</p>
                            </>
                        ) : (
                            <></>
                        )}

                        {cv?.education ? (
                            <>
                                <h4>Освіта</h4>
                                <p className='jobOffer-duties'>{cv.education}</p>
                            </>
                        ) : (
                            <></>
                        )}

                        {cv?.skills ? (
                            <>
                                <h4>Знання і навички</h4>
                                <p className='jobOffer-requirements'>{cv.skills}</p>
                            </>
                        ) : (
                            <></>
                        )}
                        {cv?.education && cv?.experience && cv?.skills ? (<hr/>):(<></>)}
                        <div className='cv-file-data'>
                            {cv?.cvLink ? ( <span className='file-span' onClick={() => window.open(cv?.cvLink?.toString(), '_blank')}><FontAwesomeIcon icon={faFile} /> Переглянути резюме</span> ):('')}
                            <p className='cv-postingDate'>{DateService.formatDateTimeToString(cv?.postingDate?.toString())}</p>
                        </div>
                        </div>
                </div>
            </div>
            <CVEditForm trigger={isCVEditFormVisible} setTrigger={setIsCVEditFormVisible} cv={cv}/>
        </>
    )
}

export default OneCV;
