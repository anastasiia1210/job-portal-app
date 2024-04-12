import './Contacts.scss'
import {FaPhoneAlt, FaTelegramPlane} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

function Contacts() {

    return (
        <>
         <div className='contact-main-div'>
             <div className='list-military-job'>
              <p>Перед подачою заявки на роботу ознайомтеся з <a href="https://ips.ligazakon.net/document/RE35210" target="_blank" rel="noopener noreferrer">списком військових професій</a></p>
             </div>
         </div>
           <div className='contact-information'>
               <div>
                   <FaTelegramPlane className='icon'/>
                   <p>@telegram</p>
                   <p>@support24</p>
               </div>
               <div>
                   <FaPhoneAlt className='icon'/>
                   <p>+380978995655</p>
                   <p>+380667210095</p>
               </div>
               <div>
                   <MdEmail className='icon'/>
                   <p>support24@gmail.com</p>
                   <p>ulavahSupport@gmail.com</p>
               </div>
           </div>
            <div className='text-about-project'>
                <h2>ЗСУ потрібні різні професії!</h2>
                <p>Проект "У лавах", головна ціль якого – надавати сучасні можливості рекрутингу на користь оборони України.</p>
                <p>На платформі розміщені як військові професії, які передбачають офіційну мобілізацію, так і цивільні.</p>
            </div>
        </>
    )
}

export default Contacts
