import { useEffect, useState } from "react";
import { entryService } from "../services/entryService";
import { type Entry } from "../models/Entry";

export const useEntries = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

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
    
    const createEntry = async (newEntry: Omit<Entry, "_id">) => {
        const created = await entryService.create(newEntry);
        setEntries(prev => [...prev, created]);
    }

    const updateEntry = async (id: string, updatedData: Omit<Entry, "_id">) => {
        const updated = await entryService.update(id, updatedData);
        setEntries(prev => prev.map(e => (e._id === id ? updated : e)));
    }

    const deleteEntry = async (id: string) => {
        await entryService.delete(id);
        setEntries(prev => prev.filter(e => e._id !== id));
    }
    
    useEffect(() => {
        loadEntries();
    }, []);
    return { entries, loading, setEntries, createEntry, updateEntry, deleteEntry };
}