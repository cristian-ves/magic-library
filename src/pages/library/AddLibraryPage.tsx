import { LibraryForm } from "@/components/libraries/LibraryForm";

export const AddLibraryPage = () => {

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-heading mb-6 text-magicPurple">Add New Library</h1>
            <LibraryForm />
        </div>
    );
};
