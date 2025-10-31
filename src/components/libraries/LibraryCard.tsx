import type { Library } from "@/types/types";
import { useNavigate } from "react-router-dom";

interface LibraryCardProps {
    library: Library;
    onAddBook?: () => void;
}

export const LibraryCard = ({ library, onAddBook }: LibraryCardProps) => {
    const navigate = useNavigate();

    const onAddEdges = () => {
        navigate('/libraries/add-edges', { state: { initialSourceId: library.id } });
    };


    return (
        <div className="p-4 bg-grayPurple text-lightPurple rounded-lg shadow-glow flex flex-col gap-2">
            <h2 className="font-heading text-xl">{library.name}</h2>
            <p><span className="font-bold">ID:</span> {library.id}</p>
            <p><span className="font-bold">Location:</span> {library.location}</p>
            <p><span className="font-bold">Entry Time:</span> {library.entryTime}</p>
            <p><span className="font-bold">Transfer Time:</span> {library.transferTime}</p>
            <p><span className="font-bold">Dispatch Interval:</span> {library.dispatchInterval}</p>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={onAddBook}
                    className="bg-magicPurple hover:bg-deepPurple text-lightPurple p-2 rounded-md shadow-glow font-body"
                >
                    Add Book
                </button>
                <button
                    onClick={onAddEdges}
                    className="bg-magicGreen hover:bg-green-600 text-lightPurple p-2 rounded-md shadow-glow font-body"
                >
                    Add Edges
                </button>
            </div>
        </div>
    );
};