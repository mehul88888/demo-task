import "./App.css";
import { CurrencySwap } from "./modules";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-5 bg-gray-100 dark:bg-gray-900 transition-colors duration-200 bg-bgGradient bg-no-repeat bg-cover">
      <CurrencySwap />
    </main>
  );
}

export default App;
