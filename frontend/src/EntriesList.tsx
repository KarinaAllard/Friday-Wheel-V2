import { useState } from "react";
import { useEntriesContext } from "./context/EntriesContext";

export const EntriesList = () => {
    const { entries, deleteEntry, updateEntry, loading } = useEntriesContext();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ restaurant: "", suggestedBy: "" });

    const startEditing = (entry: { _id: string; restaurant: string; suggestedBy: string; }) => {
        setEditingId(entry._id);
        setFormData({ restaurant: entry.restaurant, suggestedBy: entry.suggestedBy });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id: string) => {
        await updateEntry(id, formData);
        setEditingId(null);
    }

    if (loading) return <p>Loading...</p>;
    if (entries.length === 0) return <p>There are no entries! Feel free to submit one.</p>

    return (

        <div className="w-full">
            <ul className="flex flex-col gap-4 w-full items-center">
                {entries.map((entry) => (
                    <li key={entry._id} className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col space-y-4">
                        {editingId === entry._id ? (
                            <div className="flex flex-col w-full gap-4">
                                <label className="flex flex-col">
                                    Restaurant:
                                    <input 
                                        name="restaurant" 
                                        value={formData.restaurant}
                                        onChange={handleChange}
                                        className="border p-1 rounded flex-1"
                                    />
                                </label>
                                <label className="flex flex-col">
                                    Suggested by:
                                    <input 
                                        name="suggestedBy" 
                                        value={formData.suggestedBy}
                                        onChange={handleChange}
                                        className="border p-1 rounded flex-1"
                                    />
                                </label>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <button
                                        onClick={() => saveEdit(entry._id)}
                                        className="bg-green-300 text-black px-4 py-2 rounded-2xl hover:bg-green-400 w-full border-t border-t-white hover:scale-105"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-400 px-4 py-2 rounded-2xl hover:bg-gray-500 w-full border-t border-t-white hover:scale-105"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col space-y-4">
                                <span className="text-lg flex flex-col font-bold">
                                    {entry.restaurant}
                                    <span className="opacity-70 font-medium">
                                        (Suggested by: {entry.suggestedBy})
                                    </span>
                                </span>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <button 
                                        onClick={() => startEditing(entry)}
                                        className="bg-yellow-200 text-black px-4 py-2 rounded-2xl hover:bg-yellow-300 w-full border-t border-t-white hover:scale-105"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteEntry(entry._id)}
                                        className="bg-red-400 text-white px-4 py-2 rounded-2xl hover:bg-red-500 w-full border-t border-t-white hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}