import CompanyInterface from "./CompanyInterface";
import CategoryInterface from "./JobCategoryInterface";

interface JobOfferInterface {
    id: string;
    name: string;
    salary: number;
    city: string;
    description: string;
    duties: string;
    requirements: string;
    conditions: string;
    militaryWork?: boolean;
    postingDate: Date;
    category: CategoryInterface;
    company: CompanyInterface;
}
export default JobOfferInterface;
