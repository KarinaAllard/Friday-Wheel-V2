import { useState } from "react";
import { useEntriesContext } from "./context/EntriesContext";

export const NewEntryForm = () => {
	const { createEntry } = useEntriesContext();
	const [restaurant, setRestaurant] = useState("");
	const [suggestedBy, setSuggestedBy] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!restaurant || !suggestedBy) return;

		await createEntry({ restaurant, suggestedBy });
		setRestaurant("");
		setSuggestedBy("");
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
            <div className="flex flex-col md:flex gap-2">
                <label className="flex flex-col">
                    Restaurant Name:
                    <input
                        type="text"
                        placeholder="Restaurant Name"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        className="border p-2 rounded"
                    />
                </label>
                <label className="flex flex-col">
                    Suggested by:
                    <input
                        type="text"
                        placeholder="Suggested by"
                        value={suggestedBy}
                        onChange={(e) => setSuggestedBy(e.target.value)}
                        className="border p-2 rounded"
                    />
                </label>
            </div>
            <button type="submit" className="px-4 py-2 bg-(--pastel-magenta) border-t border-t-white text-black text-2xl rounded-2xl hover:bg-linear-to-l hover:from-(--pastel-lilac) hover:via-(--pastel-magenta) hover:scale-105 hover:to-(--pastel-indigo) cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                Add Entry
            </button>
		</form>
	);
};
