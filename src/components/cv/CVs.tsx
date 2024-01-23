import './CVs.scss'
import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import CVInterface from "../../interfaces/CVInterface";
import {CVService} from "../../services/CVService";
import {Link} from "react-router-dom";
import {DateService} from "../../services/DateService";
function CVs() {
    const [cvs, setCVs] = useState<CVInterface[]>([]);

    useEffect(() => {
        const getAllCvsOneSeeker = async () => {
            try {
                const response = await CVService.getAllCvsOneSeeker(localStorage.id);
                setCVs(response);
            } catch (error) {
                toast.error('Error fetching cvs:', error);
            }
        };
        getAllCvsOneSeeker();
    }, []);
    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className='cvs-main-div'>
                {cvs.length === 0 ? (
                    <div></div>
                ) : (
                    cvs.map((cv) => (
                        <div className='cv-div' key={cv.id}>
                                <Link to={`/cv/${cv.id}`} className='name' > {cv.name} </Link>
                                <p>Категорія: {cv.category.name}</p>
                                <p>{DateService.formatDateTimeToString(cv.postingDate.toString())}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default CVs
