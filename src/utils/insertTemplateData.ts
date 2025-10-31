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
};
