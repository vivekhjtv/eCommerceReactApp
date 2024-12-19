import { ScrollRestoration } from "react-router-dom";
import "./App.css";
import Template from "./pages/Template";

function App() {
  return (
    <>
      <ScrollRestoration />
      <Template />
    </>
  );
}

export default App;
