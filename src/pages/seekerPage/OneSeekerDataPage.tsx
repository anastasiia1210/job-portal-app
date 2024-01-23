import OneSeekerData from "../../components/seeker/OneSeekerData";

function OneSeekerDataPage() {
const id = localStorage.id;
    return (
        <>
            <OneSeekerData id={id}/>
        </>
    )
}

export default OneSeekerDataPage;
