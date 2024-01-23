import JobCategoryInterface from "./JobCategoryInterface";
import SeekerInterface from "./SeekerInterface";

interface CVInterface {
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

export default CVInterface;
