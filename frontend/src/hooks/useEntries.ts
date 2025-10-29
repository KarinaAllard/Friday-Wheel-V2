import { useEffect, useState } from "react";
import { entryService } from "../services/entryService";
import { type Entry } from "../models/Entry";

export const useEntries = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEntries = async () => {
            try {
                const data = await entryService.getAll();
                setEntries(data);
            } catch (error) {
                console.error("Failed to fetch entries:", error);
            } finally {
                setLoading(false);
            }
        };
        loadEntries();
    }, []);
    return { entries, loading, setEntries };
}