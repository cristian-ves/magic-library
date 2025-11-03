import { useAddBook } from "@/hooks/useAddBook";

export const BookForm = () => {
    const { formData, handleChange, handleSubmit, libraries } = useAddBook();

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 max-w-lg mx-auto border rounded-2xl shadow-lg"
        >
            <h2 className="text-2xl font-bold text-center mb-4">
                Add a New Book
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <input
                type="number"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <select
                name="libraryId"
                value={formData.libraryId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            >
                <option value="">Select Source Library</option>
                {libraries.map((lib) => (
                    <option key={lib.name} value={lib.name}>
                        {lib.value.id}
                    </option>
                ))}
            </select>

            <select
                name="originLibraryId"
                value={formData.originLibraryId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            >
                <option value="">Select Origin Library</option>
                {libraries.map((lib) => (
                    <option key={lib.name} value={lib.name}>
                        {lib.value.id}
                    </option>
                ))}
            </select>

            <select
                name="transferType"
                value={formData.transferType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            >
                <option value="time">Transfer by Time</option>
                <option value="cost">Transfer by Cost</option>
            </select>

            <button
                type="submit"
                className="bg-magicPurple w-full py-2 rounded hover:bg-deepPurple text-lightPurple transition"
            >
                Add Book
            </button>
        </form>
    );
};
