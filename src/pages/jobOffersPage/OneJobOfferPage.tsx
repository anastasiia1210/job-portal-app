import React from 'react';
import { useParams } from 'react-router-dom';
import OneJobOffer from "../../components/jobOffers/OneJobOffer";

function OneJobOfferPage() {
    const { id } = useParams();
    return (
        <>
            <OneJobOffer id={id} />
        </>
    )
}

export default OneJobOfferPage;
