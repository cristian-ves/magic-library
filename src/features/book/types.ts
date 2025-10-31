export interface Book {
    title: string;
    isbn: string;
    genre: string;
    year: number;
    author: string;
    state: "available" | "borrowed" | "in transit" | "out of stock";
    libraryId: string;
}
