import { Outlet } from "react-router-dom";
import Header from "./pages/Header";

function App() {
  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 dark:text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
