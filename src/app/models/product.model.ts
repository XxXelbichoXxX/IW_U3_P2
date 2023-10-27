export interface Product{
    name: string;
    price: number;
    description?: string; //el ? es cuando es opcional
    type: string;
    photo: string;
    style: string;
    status?: boolean;
}
