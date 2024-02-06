import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import SeekerInterface from "../../interfaces/SeekerInterface";
import {SeekerService} from "../../services/SeekerService";
import './OneSeekerData.scss'
import {DateService} from "../../services/DateService";
import {Link} from "react-router-dom";

function OneSeekerData({id}) {
    const [seeker, setSeeker] = useState<SeekerInterface>();

    useEffect(() => {
        const getOneSeeker = async () => {
            try {
                const response = await SeekerService.getOneSeeker(id);
                setSeeker(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching seeker:', error);
            }
        };
        getOneSeeker();
    }, []);

   return(
       <div className='one-seeker-main-div'>
           <Toaster position="bottom-left" reverseOrder={false}/>
           <div className='one-seeker-div' key={seeker?.id}>
               <div className='one-seeker-text-img'>
                       <div className='seeker-info'>
                           <h1 className='one-seeker-name'>{seeker?.firstName} {seeker?.lastName}</h1>
                           <p  className='one-seeker-city'>Стать: {seeker?.gender === 'Male' ? ('Чоловік'):('Жінка')}</p>
                           <p  className='one-seeker-city'>Місто: {seeker?.city}</p>
                           <p  className='one-seeker-age'>Вік: {DateService.getAgeByBirthday(seeker?.birthday)} </p>
                           <p  className='one-seeker-phone'>Телефон: {seeker?.phoneNumber}</p>
                           <p  className='one-seeker-email'>Email: {seeker?.email}</p>
                           <p  className='one-seeker-telegram'>Telegram: <a href={`https://t.me/${seeker?.telegram}`} target="_blank" rel="noopener noreferrer">{seeker?.telegram}</a></p>
                           <p className='one-seeker-military-exp'>Військовий досвід:
                               {seeker?.militaryExperience ? (<span> ✅</span>) : (<span> &#10060;</span>)}
                           </p>
                           <p  className='one-seeker-military-work'>Згода на військову службу:
                               {seeker?.militaryWork ? (<span> ✅</span>) : (<span> &#10060;</span>)}
                           </p>
                           <div className='edit-button-div'>
                               <Link to={`/seeker/data/edit/${id}`} className='edit-button'>
                               <button className='edit-button'>Редагувати</button>
                               </Link>
                           </div>
                       </div>
                   <div className='seeker-image'>
                       <img src={seeker?.image}/>
                   </div>
               </div>
           </div>
       </div>
   )
}

export default OneSeekerData;
