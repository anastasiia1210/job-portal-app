import JobCategoryInterface from "./JobCategoryInterface";
import SeekerInterface from "./SeekerInterface";

export interface CVInterface {
    id: string;
    name: string;
    education?: string | null;
    experience?: string | null;
    skills?: string | null;
    postingDate: Date;
    cvLink?: string | null;
    category: JobCategoryInterface;
    seeker: SeekerInterface;
}

export interface CreateCVInterface {
    name: string;

    education?: string;

    experience?: string;

    skills?: string;

    cvLink?: string;

    categoryId: string;

    seekerId: string;
}

