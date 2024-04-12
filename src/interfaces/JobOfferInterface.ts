import CompanyInterface from "./CompanyInterface";
import CategoryInterface from "./JobCategoryInterface";

export default interface JobOfferInterface {
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

export interface CreateJobOfferInterface {
    name: string;
    salary: number;
    city: string;
    description: string;
    duties: string;
    requirements: string;
    conditions: string;
    militaryWork?: boolean;
    categoryId: string;
    companyId: string;
}

