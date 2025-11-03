import { createContext, useContext, useState, type ReactNode } from "react";
import { Graph, GraphNode, DoublyLinkedList } from "@/structures";
import type { Book, Library } from "@/types/types";

interface LibrariesContextProps {
    librariesGraph: Graph<Library>;
    librariesList: DoublyLinkedList<GraphNode<Library>>;
    addLibrary: (library: Library) => void;
    addBook: (book: Book) => void;
}

const LibrariesContext = createContext<LibrariesContextProps | undefined>(undefined);

export const LibrariesProvider = ({ children }: { children: ReactNode }) => {
    const [librariesGraph] = useState(() => new Graph<Library>());
    const [librariesList] = useState(() => new DoublyLinkedList<GraphNode<Library>>());

    const addLibrary = (library: Library) => {
        librariesGraph.addNode(library.id, library);
        const libraryNode = librariesGraph.getNode(library.id);
        if (libraryNode) librariesList.append(libraryNode);
    };

    const addBook = (book: Book) => {
        const libraryNode = librariesGraph.getNode(book.library.id);
        if (!libraryNode) return;

        const library = libraryNode.value;
        const books = library.books;


        books.linkedList.append(book);
        books.avlTitle.insert(book.title, book);
        books.bPlusTreeGenre.insert(book.genre, book);
        books.bTreeYear.insert(book.year.toString(), book);
        books.hashTableIsbn.set(book.isbn, book);
    };



    return (
        <LibrariesContext.Provider value={{ librariesGraph, librariesList, addLibrary, addBook }}>
            {children}
        </LibrariesContext.Provider>
    );
};

export const useLibrariesContext = () => {
    const context = useContext(LibrariesContext);
    if (!context) throw new Error("useLibrariesContext must be used within a LibrariesProvider");
    return context;
};
