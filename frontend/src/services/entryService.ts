import { api } from "./baseService";
import { type Entry } from "../models/Entry";

export const entryService = {
    getAll: async (): Promise<Entry[]> => {
        const response = await api.get("/entries");
        return response.data;
    },

    create: async (newEntry: Omit<Entry, "_id">): Promise<Entry> => {
        const response = await api.post("/entries", newEntry);
        return response.data;
    },

    update: async (id: string, updatedData: Omit<Entry, "_id">): Promise<Entry> => {
        const response = await api.put(`/entries/${id}`, updatedData);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/entries/${id}`);
    },
};