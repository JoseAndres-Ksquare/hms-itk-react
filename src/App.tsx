import "./App.css";
import { Router } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./App/store";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
