import {
    Queue,
    DoublyLinkedList,
    AVLTree,
    BPlusTree,
    BTree,
    HashTable,
} from "@/structures";
import type { Library, Book } from "@/types/types";

export const insertTemplateData = (addLibrary: (library: Library) => void) => {
    const templateLibraries: Library[] = [
        {
            id: "lib1",
            name: "Central Library",
            location: "Downtown",
            entryTime: 5,
            transferTime: 10,
            dispatchInterval: 30,
            entryQueue: new Queue<Book>(),
            transferQueue: new Queue<Book>(),
            exitQueue: new Queue<Book>(),
            books: {
                linkedList: new DoublyLinkedList<Book>(),
                avlTitle: new AVLTree<Book>(),
                bPlusTreeGenre: new BPlusTree<Book>(),
                bTreeYear: new BTree<Book>(),
                hashTableIsbn: new HashTable(),
            },
        },
        {
            id: "lib2",
            name: "North Library",
            location: "Uptown",
            entryTime: 4,
            transferTime: 8,
            dispatchInterval: 25,
            entryQueue: new Queue<Book>(),
            transferQueue: new Queue<Book>(),
            exitQueue: new Queue<Book>(),
            books: {
                linkedList: new DoublyLinkedList<Book>(),
                avlTitle: new AVLTree<Book>(),
                bPlusTreeGenre: new BPlusTree<Book>(),
                bTreeYear: new BTree<Book>(),
                hashTableIsbn: new HashTable(),
            },
        },
        {
            id: "lib3",
            name: "East Library",
            location: "East Side",
            entryTime: 6,
            transferTime: 12,
            dispatchInterval: 20,
            entryQueue: new Queue<Book>(),
            transferQueue: new Queue<Book>(),
            exitQueue: new Queue<Book>(),
            books: {
                linkedList: new DoublyLinkedList<Book>(),
                avlTitle: new AVLTree<Book>(),
                bPlusTreeGenre: new BPlusTree<Book>(),
                bTreeYear: new BTree<Book>(),
                hashTableIsbn: new HashTable(),
            },
        },
        {
            id: "lib4",
            name: "South Library",
            location: "South Side",
            entryTime: 3,
            transferTime: 7,
            dispatchInterval: 15,
            entryQueue: new Queue<Book>(),
            transferQueue: new Queue<Book>(),
            exitQueue: new Queue<Book>(),
            books: {
                linkedList: new DoublyLinkedList<Book>(),
                avlTitle: new AVLTree<Book>(),
                bPlusTreeGenre: new BPlusTree<Book>(),
                bTreeYear: new BTree<Book>(),
                hashTableIsbn: new HashTable(),
            },
        },
    ];

    templateLibraries.forEach((library) => addLibrary(library));

    const generateBooks = (library: Library, count: number) => {
        for (let i = 1; i <= count; i++) {
            const book: Book = {
                title: `${library.name} Book ${i}`,
                author: `Author ${i}`,
                isbn: `${library.id}-ISBN-${i}`,
                genre: i % 2 === 0 ? "Fiction" : "Non-Fiction",
                year: 2000 + i,
                state: "available",
                library,
            };

            library.books.linkedList.append(book);
            library.books.avlTitle.insert(book.title, book);
            library.books.bPlusTreeGenre.insert(book.genre, book);
            library.books.bTreeYear.insert(book.year.toString(), book);
            library.books.hashTableIsbn.set(book.isbn, book);
        }
    };

    let remainingBooks = 15;
    for (const lib of templateLibraries) {
        const booksForThisLib = Math.min(remainingBooks, 4);
        generateBooks(lib, booksForThisLib);
        remainingBooks -= booksForThisLib;
        if (remainingBooks <= 0) break;
    }
};
