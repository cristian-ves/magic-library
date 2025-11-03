import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import type { Book, Library } from "@/types/types";
import type { GraphNode } from "@/structures";
import { useLibraries } from "./useLibraries";

interface FormData {
    title: string;
    author: string;
    isbn: string;
    genre: string;
    year: string;
    libraryId: string;
    originLibraryId: string;
    transferType: "time" | "cost";
}

export const useAddBook = () => {
    const { librariesList, addBook } = useLibraries();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        year: "",
        libraryId: "",
        originLibraryId: "",
        transferType: "time",
    });

    const libraries: GraphNode<Library>[] = [];
    let current = librariesList.getHead();
    while (current) {
        libraries.push(current.value);
        current = current.next;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const sourceNode = libraries.find(
            (node) => node.value.id === formData.libraryId
        );
        const originNode = libraries.find(
            (node) => node.value.id === formData.originLibraryId
        );

        if (!sourceNode || !originNode) {
            await Swal.fire({
                icon: "error",
                title: "Invalid selection",
                text: "Please select both source and origin libraries.",
            });
            return;
        }

        const newBook: Book = {
            title: formData.title,
            author: formData.author,
            isbn: formData.isbn,
            genre: formData.genre,
            year: Number(formData.year),
            state: "in transit",
            library: sourceNode.value,
        };

        addBook(newBook);

        await Swal.fire({
            icon: "success",
            title: "Book added!",
            text: `${newBook.title} has been added to ${sourceNode.value.name}`,
        });

        navigate("/books");

        setFormData({
            title: "",
            author: "",
            isbn: "",
            genre: "",
            year: "",
            libraryId: "",
            originLibraryId: "",
            transferType: "time",
        });
    };

    return { formData, handleChange, handleSubmit, libraries };
};
