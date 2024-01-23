import { useParams } from 'react-router-dom';
import OneJobRequest from "../../components/jobRequests/OneJobRequest";
function OneRequestPage() {
    const { id } = useParams();
    return (
        <>
            <OneJobRequest id={id}/>
        </>
    )
}

export default OneRequestPage;
