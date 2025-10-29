import { useState } from "react";
import { useEntries } from "./hooks/useEntries";

export const NewEntryForm = () => {
	const { createEntry } = useEntries();
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
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Restaurant Name"
				value={restaurant}
				onChange={(e) => setRestaurant(e.target.value)}
                className="border p-2 rounded"
			/>
			<input
				type="text"
				placeholder="Suggested by"
				value={suggestedBy}
				onChange={(e) => setSuggestedBy(e.target.value)}
                className="border p-2 rounded"
			/>
            <button type="submit">
                Add Entry
            </button>
		</form>
	);
};
