import OneEmployerData from "../../components/employer/OneEmployerData";

function OneEmployerDataPage() {
    const id = localStorage.id;
    return (
        <>
            <OneEmployerData id={id}/>
        </>
    )
}

export default OneEmployerDataPage;
