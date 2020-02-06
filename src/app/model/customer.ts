import { Info } from './info';

export type Customer = Partial<CustomerInternal>;

interface CustomerInternal {
    key?: string | null;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    active: boolean;
    infos: Info;
}
