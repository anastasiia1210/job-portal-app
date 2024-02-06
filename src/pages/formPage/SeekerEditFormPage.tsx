import React from "react";
import { useParams } from 'react-router-dom';
import SeekerEditForm from "../../components/forms/SeekerEditForm";

function SeekerEditFormPage() {
    const { id } = useParams();
    return (
        <>
            <SeekerEditForm id={id} />
        </>
    )
}

export default SeekerEditFormPage;
