import { LibraryCard } from "@/components/libraries/LibraryCard";
import { useLibraries } from "@/hooks/useLibraries";
import type { Library } from "@/types/types";

export const LibrariesPage = () => {
    const { librariesList, } = useLibraries();
    const allLibraries = librariesList.print();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-heading mb-6">Libraries</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allLibraries.map((node) => (
                    <LibraryCard
                        key={node.value.id}
                        library={node.value as Library}
                        onAddBook={() => console.log("Add Book clicked for", node.value.id)}
                    />
                ))}
                {allLibraries.length === 0 && (
                    <p className="text-lightPurple font-body col-span-full">
                        No libraries added yet.
                    </p>
                )}
            </div>
        </div>
    );
};
