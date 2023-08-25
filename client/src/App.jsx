import "./App.scss";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { Provider, Viewport } from "@radix-ui/react-toast";

function App() {
  return (
    <BrowserRouter className="app">
      <Provider duration={3000} swipeDirection="right">
        <Router />
        <Viewport className="c-toast__viewport" />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
