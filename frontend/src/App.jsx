import { Outlet } from "react-router-dom";
import Header from "./pages/Header";
import { Provider } from "react-redux";
import { store } from "./context/store";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gradient-to-r from-violet-200 to-pink-200 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 dark:text-white">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
