import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import CVInterface from "../../interfaces/CVInterface";
import {CVService} from "../../services/CVService";
import {DateService} from "../../services/DateService";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";

function OneCV({id}) {
    const [cv, setCV] = useState<CVInterface>();

    useEffect(() => {
        const getOneCV = async () => {
            try {
                const response = await CVService.getOneCV(id);
                setCV(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching job offers:', error);
            }
        };

        getOneCV();
    }, []);
    return (
        <>
            <div className='one-cv-main-div'>
                <Toaster position="bottom-left" reverseOrder={false}/>
                <div className='cv-div' >
                    <div className='cv-text'>
                        <h1  className='cv-name'>{cv?.name}</h1>
                        <p  className='jobOffer-salary'>Категорія: {cv?.category?.name}</p>
                        <hr/>
                        {localStorage.id == cv?.seeker.id ? (''):(
                        <div className='seeker-information'>
                        <h2>Інформація про користувача</h2>
                        <p>{cv?.seeker.firstName}</p>
                        <p>Місто: {cv?.seeker.city}</p>
                        <p>Вік: {DateService.getAgeByBirthday(cv?.seeker.birthday)}</p>
                            <p>Телефон: {cv?.seeker.phoneNumber}</p>
                            <p>Email: {cv?.seeker.email}</p>
                            <p  className='one-seeker-telegram'>Telegram: <a href={`https://t.me/${cv?.seeker.telegram}`} target="_blank" rel="noopener noreferrer">{cv?.seeker.telegram}</a></p>
                            <Link to={`/seeker/data/${cv?.seeker.id}`}>
                        <button className='details-button' to={`/seeker/data/${localStorage.id}`}>Детальніше</button>
                            </Link>
                            <hr/>
                        </div>
                        )}
                        <h2>Досвід роботи</h2>
                        <p  className='jobOffer-description'>{cv?.experience}</p>
                        <h2>Освіта</h2>
                        <p  className='jobOffer-duties'>{cv?.education}</p>
                        <h2>Знання і навички</h2>
                        <p  className='jobOffer-requirements'>{cv?.skills}</p>
                        <hr/>
                        <div className='cv-file-data'>
                            {cv?.cvLink ? ( <span className='file-span' onClick={() => window.open(cv?.cvLink?.toString(), '_blank')}><FontAwesomeIcon icon={faFile} /> Переглянути резюме</span> ):('')}
                        <p className='cv-postingDate'>{DateService.formatDateTimeToString(cv?.postingDate?.toString())}</p>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default OneCV;
