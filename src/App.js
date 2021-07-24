import { useState, useEffect } from "react";

import "./styles.css";

// import SoloLoop from "./containers/SoloLoop";
import CompareTypesGrid from "./containers/CompareTypesGrid";
// import Walkthrough from "./containers/Walkthrough";
import CogFuncExplorer from "./containers/CogFuncExplorer/CogFuncExplorer";
import { personTypesData } from "./data/personTypesData";

export default function App() {
  const [counter, setCounter] = useState(0);
  const personTypesArray = personTypesData.map((d) => d.type);
  const loopTime = 1000;

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCounter((c) => (c <= personTypesArray.length - 2 ? c + 1 : 0));
  //   }, loopTime);

  //   return () => clearInterval(timer);
  // });

  return (
    <div className="App">
      <CogFuncExplorer />
      {/* <CompareTypesGrid counter={counter} /> */}
    </div>
  );
}
