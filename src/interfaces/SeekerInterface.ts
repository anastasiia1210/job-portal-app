interface SeekerInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    telegram?: string;
    image?: string;
    city: string;
    birthday: Date;
    gender: string;
    militaryExperience?: boolean;
    militaryWork?: boolean;
}

export default SeekerInterface;
