import { EntriesList } from "./EntriesList";
import { NewEntryForm } from "./NewEntryForm";
import { Wheel } from "./Wheel";
import { EntriesProvider } from "./context/EntriesContext";
import { useEntries } from "./hooks/useEntries";

function App() {
  const { entries, loading } = useEntries();

  if (loading) return <p>Loading...</p>;
  if (entries.length === 0) return <p>No entries found.</p>;
  return (
    <EntriesProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex max-w-full items-center m-10 flex-col flex-1 text-center pb-10">
          <h1 className="text-7xl bg-[linear-gradient(90deg,var(--pastel-pink),var(--pastel-red),var(--pastel-yellow),var(--pastel-green),var(--pastel-blue))] bg-[length:400%_400%] animate-[gradientShift_12s_ease_infinite,pulseGlow_6s_ease-in-out_infinite] bg-clip-text text-transparent mb-16">
            Friday Wheel
            </h1>
          <Wheel entries={entries} />
          <NewEntryForm />
          <EntriesList />
        </main>
        <footer className="w-full text-center">
          <p>Sound Effects provided by <a href="https://gfxsounds.com/sound-effect/fortune-wheel-spinning/">Gfx Sounds</a></p>
        </footer>
      </div>
    </EntriesProvider>
  )
}

export default App
