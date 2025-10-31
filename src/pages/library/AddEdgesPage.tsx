import { useLibraries } from "@/hooks/useLibraries";
import { useAddEdgeForm } from "@/hooks/useAddEdgeForm";
import { LibrarySelect } from "@/components/libraries/LibrarySelect";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

export const AddEdgesPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const initialSourceId = (state as { initialSourceId?: string })?.initialSourceId ?? "";

    const { librariesList, librariesGraph } = useLibraries();
    const allLibraries = librariesList.print();

    const {
        sourceId,
        setSourceId,
        targetId,
        setTargetId,
        weight,
        setWeight,
        type,
        setType,
        bidirectional,
        setBidirectional,
        reset,
    } = useAddEdgeForm(initialSourceId);

    const handleAddEdge = async () => {
        if (!sourceId || !targetId || sourceId === targetId) {
            return Swal.fire(
                "Invalid selection",
                "Please select valid source and target libraries.",
                "error"
            );
        }

        librariesGraph.addEdge(sourceId, targetId, weight, type, bidirectional);

        const result = await Swal.fire({
            title: "Edge Added",
            text: `Edge added from ${sourceId} to ${targetId}${bidirectional ? " bidirectionally" : ""}`,
            icon: "success",
            confirmButtonText: "OK",
        });

        if (result.isConfirmed) {
            reset();
            navigate("/libraries/graph");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-heading mb-4">Add Edge</h1>

            <LibrarySelect
                label="Source Library"
                value={sourceId}
                onChange={setSourceId}
                options={allLibraries}
            />
            <LibrarySelect
                label="Target Library"
                value={targetId}
                onChange={setTargetId}
                options={allLibraries}
            />

            <label className="font-body">Weight</label>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="p-2 rounded-md border border-grayPurple focus:outline-none focus:ring-2 focus:ring-magicPurple"
            />

            <label className="font-body">Type</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value as "time" | "cost")}
                className="p-2 rounded-md border border-grayPurple focus:outline-none focus:ring-2 focus:ring-magicPurple"
            >
                <option value="time">Time</option>
                <option value="cost">Cost</option>
            </select>

            <label className="flex items-center gap-2 font-body">
                <input
                    type="checkbox"
                    checked={bidirectional}
                    onChange={(e) => setBidirectional(e.target.checked)}
                />
                Bidirectional
            </label>

            <button
                onClick={handleAddEdge}
                className="bg-magicPurple hover:bg-deepPurple text-lightPurple p-2 rounded-md shadow-glow font-body"
            >
                Add Edge
            </button>
        </div>
    );
};
