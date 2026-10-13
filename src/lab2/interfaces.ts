
export interface Person {
    name: string;
    email: string;
}

export interface Author extends Person {
    numBooksPublished: number;
}

export interface Librarian extends Person {
    department: string;
    assistCustomer(custName: string): void;
}
