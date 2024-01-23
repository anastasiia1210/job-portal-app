import SeekerInterface from "./SeekerInterface";
import JobOfferInterface from "./JobOfferInterface";
import CVInterface from "./CVInterface";

interface JobRequestInterface {
    id: string;
    text?: string | null;
    status?: boolean | null;
    seeker: SeekerInterface;
    postingDate: Date;
    jobOffer: JobOfferInterface
    cv?: CVInterface | null;
}
export default JobRequestInterface;
