import { DoublyLinkedList } from "@/structures/DoublyLinkedList";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "./types";
import { AVLTree, BPlusTree, BTree, HashTable } from "@/structures/";

interface BooksState {
    books: DoublyLinkedList<Book>;
    avlTitle: AVLTree<Book>;
    bPlusTreeGenre: BPlusTree<Book>;
    bTreeYear: BTree<Book>;
    hashTableIsbn: HashTable;
}

const initialState: BooksState = {
    books: new DoublyLinkedList(),
    avlTitle: new AVLTree(),
    bPlusTreeGenre: new BPlusTree(),
    bTreeYear: new BTree(),
    hashTableIsbn: new HashTable(),
};

const counterSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            const book = action.payload;

            state.books.append(book);
            state.avlTitle.insert(book.title, book);
            state.bPlusTreeGenre.insert(book.genre, book);
            state.bTreeYear.insert(book.year.toString(), book);
            state.hashTableIsbn.set(book.isbn, book);
        },
    },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
