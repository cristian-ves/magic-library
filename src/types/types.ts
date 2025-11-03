import type {
    AVLTree,
    BPlusTree,
    BTree,
    DoublyLinkedList,
    HashTable,
    Queue,
} from "@/structures";

export interface Book {
    title: string;
    isbn: string;
    genre: string;
    year: number;
    author: string;
    state: "available" | "borrowed" | "in transit";
    library: Library;
}

export interface Books {
    linkedList: DoublyLinkedList<Book>;
    avlTitle: AVLTree<Book>;
    bPlusTreeGenre: BPlusTree<Book>;
    bTreeYear: BTree<Book>;
    hashTableIsbn: HashTable;
}

export interface Library {
    id: string;
    name: string;
    location: string;
    entryTime: number;
    transferTime: number;
    dispatchInterval: number;
    entryQueue: Queue<Book>;
    transferQueue: Queue<Book>;
    exitQueue: Queue<Book>;
    books: Books;
}
