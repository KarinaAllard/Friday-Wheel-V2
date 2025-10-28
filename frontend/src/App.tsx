import { useEffect, useState } from "react";
import { Wheel } from "./Wheel";
import { fetchSheetEntries, type Entry } from "./services/sheetService";

const sheetId = "1vuf0i_XZRzcQWgKthR5V1YHGvxwg0E_AXFIderMYBps";
function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const load = async () => {
      try {
        const data = await fetchSheetEntries(sheetId);
        setEntries(data);
      } catch (error) {
        console.error("Failed to fetch sheet:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (entries.length === 0) return <p>No entries found.</p>
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex max-w-full items-center m-10 flex-col flex-1 text-center pb-10">
        <h1 className="text-7xl bg-[linear-gradient(90deg,var(--pastel-pink),var(--pastel-red),var(--pastel-yellow),var(--pastel-green),var(--pastel-blue))] bg-[length:400%_400%] animate-[gradientShift_12s_ease_infinite,pulseGlow_6s_ease-in-out_infinite] bg-clip-text text-transparent mb-16">Friday Wheel</h1>
        <Wheel entries={entries}>
        </Wheel>
      </main>
      <footer className="w-full text-center">
        <p>Sound Effects provided by <a href="https://gfxsounds.com/sound-effect/fortune-wheel-spinning/">Gfx Sounds</a></p>
      </footer>
    </div>
  )
}

export default App
