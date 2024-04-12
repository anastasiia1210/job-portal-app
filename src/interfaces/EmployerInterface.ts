import CompanyInterface from "./CompanyInterface";

export interface EmployerInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    position: string;
    approved?: boolean;
    company: CompanyInterface;
}

export interface CreateEmployerInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    position: string;
    approved?: boolean;
    companyId: string;
}
