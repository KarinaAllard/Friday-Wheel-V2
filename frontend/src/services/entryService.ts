import { api } from "./baseService";

export const entryService = {
    getAll: async () => {
        const response = await api.get("/entries");
        return response.data;
    },

    create: async (newEntry: { restaurant: string; suggestedBy: string }) => {
        const response = await api.post("/entries", newEntry);
        return response.data;
    },

    update: async (id: string, updatedData: { restaurant: string; suggestedBy: string }) => {
        const response = await api.put(`/entries/${id}`, updatedData);
        return response.data;
    },

    delete: async (id: string) => {
        await api.delete(`/entries/${id}`);
    },
};