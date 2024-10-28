import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calculator from "./component/Calculator";

function App() {
  return (
    <div>
      <h1>My Personal calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
