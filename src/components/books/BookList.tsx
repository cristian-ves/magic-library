import type { Book } from "@/types/types";
import type { JSX } from "react";

export const BookList = ({
    linkedList,
}: {
    linkedList: import("@/structures").DoublyLinkedList<Book>;
}) => {
    let current = linkedList.getHead();
    const elements: JSX.Element[] = [];

    while (current) {
        const book = current.value;
        elements.push(
            <li key={book.isbn} className="py-2 border-b">
                <div className="flex justify-between">
                    <span className="font-medium">{book.title}</span>
                    <span className="text-gray-500 text-sm">{book.author}</span>
                </div>
                <div className="text-sm text-gray-600">
                    Genre: {book.genre} | Year: {book.year} | ISBN: {book.isbn} | state: {book.state}
                </div>
            </li>
        );
        current = current.next;
    }

    return elements.length > 0 ? (
        <ul className="divide-y">{elements}</ul>
    ) : (
        <p className="text-gray-400">No books added yet.</p>
    );
};