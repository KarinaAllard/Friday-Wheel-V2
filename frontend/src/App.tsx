import { EntriesList } from "./EntriesList";
import { NewEntryForm } from "./NewEntryForm";
import { Wheel } from "./Wheel";
import { EntriesProvider } from "./context/EntriesContext";

function App() {

  return (
    <EntriesProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex max-w-full items-center m-4 md:m-10 flex-col flex-1 text-center pb-10">
          <div className="mb-10 flex flex-col items-center justify-center">
            <h1 className="text-7xl bg-[linear-gradient(90deg,var(--pastel-purple),var(--pastel-indigo),var(--pastel-lilac),var(--pastel-magenta),var(--pastel-teal))] bg-[length:400%_400%] animate-[gradientShift_12s_ease_infinite,pulseGlow_6s_ease-in-out_infinite] bg-clip-text text-transparent">
              Friday Wheel
              </h1>
              <h2 className="text-xl">presented by</h2>
            <img src="./eneryield.png" alt="Eneryield" width="400px" />
          </div>
          <Wheel />
          <NewEntryForm />
          <EntriesList />
        </main>
        <footer className="w-full text-center">
          <p>Sound Effects provided by <a href="https://gfxsounds.com/sound-effect/fortune-wheel-spinning/">Gfx Sounds</a></p>
          <p className="text-sm">Project created for Eneryield by me, Karina Allard.</p>
        </footer>
      </div>
    </EntriesProvider>
  )
}

export default App
