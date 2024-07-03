

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: string;
    client_secret: string;
    created: number;
}