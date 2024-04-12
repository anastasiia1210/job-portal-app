import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import '../seeker/OneSeekerData.scss'
import {Link} from "react-router-dom";
import {EmployerInterface} from "../../interfaces/EmployerInterface";
import {EmployerService} from "../../services/EmployerService";

function OneEmployerData({id}) {
    const [employer, setEmployer] = useState<EmployerInterface>();

    useEffect(() => {
        const getOneEmployer = async () => {
            try {
                const response = await new EmployerService().getEmployerById(id);
                setEmployer(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching seeker:', error);
            }
        };
        getOneEmployer();
    }, []);

    return(
        <div className='one-seeker-main-div'>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='one-seeker-div' key={employer?.id}>
                <div className='one-seeker-text-img'>
                    <div className='seeker-info'>
                        <h1 className='one-seeker-name'>{employer?.firstName} {employer?.lastName}</h1>
                        <p  className='one-seeker-email'>Email: {employer?.email}</p>
                        <p  className='one-seeker-phone'>Телефон: {employer?.phoneNumber}</p>
                        <p  className='one-seeker-email'>Посада: {employer?.position}</p>
                        <p  className='one-seeker-military-work'>Підтверджено:
                            {employer?.approved ? (<span> ✅</span>) : (<span> &#10060;</span>)}
                        </p>
                        <p  className='one-seeker-email'>Підрозділ: <Link to={`/company/${employer?.company.id}`}>{employer?.company.name}</Link></p>
                        <div className='edit-button-div'>
                            <Link to={`/employer/data/edit/${id}`} className='edit-button'>
                                <button className='edit-button'>Редагувати</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneEmployerData;
