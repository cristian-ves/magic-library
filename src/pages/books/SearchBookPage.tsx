import { useState } from "react";
import { useLibraries } from "@/hooks/useLibraries";
import type { Book, Library } from "@/types/types";

type SearchType = "title" | "genre" | "year" | "isbn";

export const SearchBookPage = () => {
    const { librariesList } = useLibraries();
    const [searchType, setSearchType] = useState<SearchType>("title");
    const [query, setQuery] = useState("");
    const [yearRange, setYearRange] = useState({ from: "", to: "" });
    const [results, setResults] = useState<Book[]>([]);

    const handleSearch = () => {
        const foundBooks: Book[] = [];
        let current = librariesList.getHead();

        while (current) {
            const library: Library = current.value.value;
            const books = library.books;

            switch (searchType) {
                case "title":
                    const bookByTitle = books.avlTitle.search(query);
                    if (bookByTitle) foundBooks.push(bookByTitle);
                    break;

                case "genre":
                    const booksByGenre = books.bPlusTreeGenre.search(query);
                    if (booksByGenre && Array.isArray(booksByGenre)) foundBooks.push(...booksByGenre);
                    break;

                case "year":
                    const from = Number(yearRange.from);
                    const to = Number(yearRange.to);
                    if (!isNaN(from) && !isNaN(to)) {
                        const booksByYear: Book[] = [];
                        for (let year = from; year <= to; year++) {
                            const yearBooks = books.bTreeYear.search(year.toString());
                            if (yearBooks) booksByYear.push(...yearBooks);
                        }
                        foundBooks.push(...booksByYear);
                    }
                    break;

                case "isbn":
                    const bookByIsbn = books.hashTableIsbn.get(query);
                    if (bookByIsbn) foundBooks.push(bookByIsbn);
                    break;
            }

            current = current.next;
        }

        setResults(foundBooks);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Search Books</h1>

            <div className="flex gap-4 mb-4">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as SearchType)}
                    className="border rounded p-2"
                >
                    <option value="title">Title</option>
                    <option value="genre">Genre</option>
                    <option value="year">Year Range</option>
                    <option value="isbn">ISBN</option>
                </select>

                {searchType === "year" ? (
                    <>
                        <input
                            type="number"
                            placeholder="From Year"
                            value={yearRange.from}
                            onChange={(e) => setYearRange({ ...yearRange, from: e.target.value })}
                            className="border rounded p-2 w-32"
                        />
                        <input
                            type="number"
                            placeholder="To Year"
                            value={yearRange.to}
                            onChange={(e) => setYearRange({ ...yearRange, to: e.target.value })}
                            className="border rounded p-2 w-32"
                        />
                    </>
                ) : (
                    <input
                        type="text"
                        placeholder={`Search by ${searchType}`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border rounded p-2 flex-1"
                    />
                )}

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            <div className="mt-6">
                {results.length === 0 ? (
                    <p>No books found.</p>
                ) : (
                    <ul className="space-y-2">
                        {results.map((book, index) => (
                            <li key={index} className="border p-3 rounded shadow">
                                <strong>{book.title}</strong> by {book.author} <br />
                                Genre: {book.genre} | Year: {book.year} | ISBN: {book.isbn} <br />
                                Library: {book.library.name} | State: {book.state}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
