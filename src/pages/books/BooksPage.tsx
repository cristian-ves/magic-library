import { BookList } from "@/components/books/BookList";
import { useLibraries } from "@/hooks/useLibraries";
import type { JSX } from "react";

export const BooksPage = () => {
    const { librariesList } = useLibraries();

    let libraryNode = librariesList.getHead();

    return (
        <div className="p-6 space-y-10">
            {(() => {
                const renderedLibraries: JSX.Element[] = [];

                while (libraryNode) {
                    const library = libraryNode.value.value;

                    renderedLibraries.push(
                        <div
                            key={library.id}
                            className="bg-white shadow-md p-5 rounded-lg"
                        >
                            <h2 className="text-2xl font-bold mb-4">
                                {library.name} - {library.id}
                            </h2>

                            <BookList linkedList={library.books.linkedList} />
                        </div>
                    );

                    libraryNode = libraryNode.next;
                }

                return renderedLibraries;
            })()}
        </div>
    );
};

