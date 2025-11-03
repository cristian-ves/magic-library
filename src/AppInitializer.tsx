import { useEffect, useRef } from "react";
import { useLibraries } from "@/hooks/useLibraries";
import type { Book, Library } from "@/types/types";
import { Queue, DoublyLinkedList, AVLTree, BPlusTree, BTree, HashTable } from "@/structures";

export const AppInitializer = () => {
    const { addLibrary, addBook, librariesGraph, librariesList } = useLibraries();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

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

        templateLibraries.forEach(addLibrary);

        const edges = [
            { from: "lib1", to: "lib2", weight: 10, type: "time" },
            { from: "lib2", to: "lib3", weight: 8, type: "cost" },
            { from: "lib2", to: "lib4", weight: 12, type: "time" },
            { from: "lib3", to: "lib4", weight: 20, type: "cost" },
        ];
        edges.forEach(({ from, to, weight, type }) =>
            librariesGraph.addEdge(from, to, weight, type as "time" | "cost", true)
        );

        const booksPerLibrary: Record<string, Book[]> = {
            lib1: [
                { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780007525492", genre: "Fantasy", year: 1937, state: "available", library: templateLibraries[0] },
                { title: "1984", author: "George Orwell", isbn: "9780451524935", genre: "Dystopian", year: 1949, state: "available", library: templateLibraries[0] },
                { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780060935467", genre: "Fiction", year: 1960, state: "available", library: templateLibraries[0] },
                { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", genre: "Fiction", year: 1925, state: "available", library: templateLibraries[0] },
                { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", genre: "Romance", year: 1813, state: "available", library: templateLibraries[0] },
            ],
            lib2: [
                { title: "Moby-Dick", author: "Herman Melville", isbn: "9780142437247", genre: "Adventure", year: 1851, state: "available", library: templateLibraries[1] },
                { title: "War and Peace", author: "Leo Tolstoy", isbn: "9780199232765", genre: "Historical", year: 1869, state: "available", library: templateLibraries[1] },
                { title: "Crime and Punishment", author: "Fyodor Dostoevsky", isbn: "9780140449136", genre: "Psychological", year: 1866, state: "available", library: templateLibraries[1] },
                { title: "Jane Eyre", author: "Charlotte Brontë", isbn: "9780142437209", genre: "Romance", year: 1847, state: "available", library: templateLibraries[1] },
                { title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488", genre: "Fiction", year: 1951, state: "available", library: templateLibraries[1] },
            ],
            lib3: [
                { title: "Brave New World", author: "Aldous Huxley", isbn: "9780060850524", genre: "Dystopian", year: 1932, state: "available", library: templateLibraries[2] },
                { title: "Animal Farm", author: "George Orwell", isbn: "9780451526342", genre: "Satire", year: 1945, state: "available", library: templateLibraries[2] },
                { title: "Wuthering Heights", author: "Emily Brontë", isbn: "9780141439556", genre: "Romance", year: 1847, state: "available", library: templateLibraries[2] },
                { title: "The Odyssey", author: "Homer", isbn: "9780140268867", genre: "Epic", year: -800, state: "available", library: templateLibraries[2] },
                { title: "Hamlet", author: "William Shakespeare", isbn: "9780141396507", genre: "Tragedy", year: 1603, state: "available", library: templateLibraries[2] },
            ],
            lib4: [
                { title: "The Divine Comedy", author: "Dante Alighieri", isbn: "9780140448955", genre: "Epic", year: 1320, state: "available", library: templateLibraries[3] },
                { title: "Les Misérables", author: "Victor Hugo", isbn: "9780451419439", genre: "Historical", year: 1862, state: "available", library: templateLibraries[3] },
                { title: "Frankenstein", author: "Mary Shelley", isbn: "9780141439471", genre: "Horror", year: 1818, state: "available", library: templateLibraries[3] },
                { title: "Dracula", author: "Bram Stoker", isbn: "9780141439846", genre: "Horror", year: 1897, state: "available", library: templateLibraries[3] },
                { title: "Don Quixote", author: "Miguel de Cervantes", isbn: "9780060934347", genre: "Adventure", year: 1605, state: "available", library: templateLibraries[3] },
            ],
        };

        let current = librariesList.getHead();
        while (current) {
            const libNode = current.value;
            const books = booksPerLibrary[libNode.value.id] || [];
            books.forEach(book => addBook(book));
            current = current.next;
        }

        initialized.current = true;
    }, [addLibrary, addBook, librariesGraph, librariesList]);

    return null;
};
