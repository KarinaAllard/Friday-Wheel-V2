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

        <div>
            <ul>
                {entries.map((entry) => (
                    <li key={entry._id} className="flex justify-between flex-col items-center border p-2 rounded">
                        {editingId === entry._id ? (
                            <div className="flex flex-col w-full">
                                <input 
                                    name="restaurant" 
                                    value={formData.restaurant}
                                    onChange={handleChange}
                                    className="border p-1 rounded flex-1"
                                />
                                <input 
                                    name="suggestedBy" 
                                    value={formData.suggestedBy}
                                    onChange={handleChange}
                                    className="border p-1 rounded flex-1"
                                />
                                <div>
                                    <button
                                        onClick={() => saveEdit(entry._id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span>
                                    {entry.restaurant}
                                    <span className="opacity-70">
                                        (Suggested by: {entry.suggestedBy})
                                    </span>
                                </span>
                                <button 
                                    onClick={() => startEditing(entry)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => deleteEntry(entry._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}