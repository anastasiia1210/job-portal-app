import React from "react";
import { useParams } from 'react-router-dom';
import OneCompany from "../../components/companies/OneCompany";

function OneCompanyPage() {
    const { id } = useParams();
    return (
        <>
            <OneCompany id={id} />
        </>
    )
}
export default OneCompanyPage;
