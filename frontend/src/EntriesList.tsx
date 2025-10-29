import { useEntriesContext } from "./context/EntriesContext";

export const EntriesList = () => {
    const { entries, deleteEntry } = useEntriesContext();

    if (entries.length === 0) return <p>There are no entries! Feel free to submt one.</p>

    return (

        <div>
            <ul>
                {entries.map((entry) => (
                    <li key={entry._id} className="flex justify-between flex-col items-center border p-2 rounded">
                        <span>
                            {entry.restaurant}
                            <span className="opacity-70">
                                (Suggested by: {entry.suggestedBy})
                            </span>
                        </span>
                        <button 
                            onClick={() => deleteEntry(entry._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}