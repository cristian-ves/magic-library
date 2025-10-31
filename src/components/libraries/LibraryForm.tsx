import { useAddLibraryForm } from "@/hooks/useAddLibraryForm";
import { useLibraries } from "@/hooks/useLibraries";
import { Queue, DoublyLinkedList, AVLTree, BPlusTree, BTree, HashTable } from "@/structures";
import type { Library } from "@/types/types";
import { useNavigate } from "react-router-dom";

export const LibraryForm = () => {
    const navigate = useNavigate();
    const { addLibrary } = useLibraries();
    const { values, errors, handleChange, validate } = useAddLibraryForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const newLibrary: Library = {
            ...values,
            entryQueue: new Queue(),
            transferQueue: new Queue(),
            exitQueue: new Queue(),
            books: {
                linkedList: new DoublyLinkedList(),
                avlTitle: new AVLTree(),
                bPlusTreeGenre: new BPlusTree(),
                bTreeYear: new BTree(),
                hashTableIsbn: new HashTable(),
            },
        } as Library;

        addLibrary(newLibrary);

        navigate("/libraries")

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-lg shadow-glow w-full max-w-md">
            {(["id", "name", "location", "entryTime", "transferTime", "dispatchInterval"] as const).map((field) => (
                <div key={field} className="flex flex-col">
                    <label className="font-body mb-1 capitalize">{field}</label>
                    <input
                        type={field.includes("Time") || field === "dispatchInterval" ? "number" : "text"}
                        value={values[field]}
                        onChange={(e) =>
                            handleChange(
                                field,
                                field.includes("Time") || field === "dispatchInterval"
                                    ? Number(e.target.value)
                                    : e.target.value
                            )
                        }
                        className="p-2 rounded-md border border-grayPurple focus:outline-none focus:ring-2 focus:ring-magicPurple"
                    />
                    {errors[field] && <span className="text-red-600 text-sm">{errors[field]}</span>}
                </div>
            ))}
            <button
                type="submit"
                className="bg-magicPurple hover:bg-deepPurple text-lightPurple p-2 rounded-md shadow-glow font-body"
            >
                Add Library
            </button>
        </form>
    );
};
