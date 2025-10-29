import { createContext, useContext } from "react";
import { useEntries } from "../hooks/useEntries";

const EntriesContext = createContext<ReturnType<typeof useEntries> | null>(null);

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
    const entries = useEntries();
    return <EntriesContext.Provider value={entries}>{children}</EntriesContext.Provider>;
};

export const useEntriesContext = () => {
    const context = useContext(EntriesContext);
    if (!context) throw new Error("useEntriesContext must be used within EntriesProvider");
    return context;
};