import OneJobRequests from "../../components/jobRequests/JobRequests";
import { useParams } from 'react-router-dom';
function RequestPage() {
    const { id } = useParams();
    return (
        <>
          <OneJobRequests id={id}/>
        </>
    )
}

export default RequestPage;
