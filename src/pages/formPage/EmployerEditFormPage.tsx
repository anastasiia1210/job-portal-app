import React from "react";
import EmployerEditForm from "../../components/forms/EmployerEditForm";
import { useParams } from 'react-router-dom';
function EmployerEditFormPage() {
    const { id } = useParams();
    return (
        <>
            <EmployerEditForm id={id}/>
        </>
    )
}

export default EmployerEditFormPage;
