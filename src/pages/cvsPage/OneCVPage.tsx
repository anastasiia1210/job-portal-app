import OneCV from "../../components/cv/OneCV";
import { useParams } from 'react-router-dom';

function OneCVPage() {
    const { id } = useParams();
    return (
        <>
            <OneCV id={id}/>
        </>
    )
}

export default OneCVPage;
