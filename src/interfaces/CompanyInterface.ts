import JobOfferInterface from "./JobOfferInterface";

interface CompanyInterface {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    telegram?: string;
    image?: string;
    city: string;
    description: string;
    jobOffers? : JobOfferInterface[];
}

export default CompanyInterface;
