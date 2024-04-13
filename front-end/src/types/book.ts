export enum BookStatus {
    Draft,
    InProgress,
    Published,
}

export interface Book {
    id: number;
    name: string;
    owner: string;
    description: string;
    status: BookStatus;
}
