import React from "react";
import { useParams } from 'react-router-dom';
import JobOfferEditForm from "../../components/forms/JobOfferEditForm";
function JobOfferEditFormPage() {
    const { id } = useParams();
    return (
        <>
            <JobOfferEditForm id={id}/>
        </>
    )
}

export default JobOfferEditFormPage;
