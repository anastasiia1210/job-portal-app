import SeekerInterface from "./SeekerInterface";
import JobOfferInterface from "./JobOfferInterface";
import {CVInterface} from "./CVInterface";

export interface JobRequestInterface {
    id: string;
    text?: string | null;
    status?: boolean | null;
    seeker: SeekerInterface;
    postingDate: Date;
    jobOffer: JobOfferInterface
    cv?: CVInterface | null;
}

export interface CreateJobRequest {
    text: string;
    status?: boolean | null;
    seekerId: string;
    jobOfferId: string;
    cvId: string;
}

