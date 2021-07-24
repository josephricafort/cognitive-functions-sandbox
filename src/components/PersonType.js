import React from "react";

import CognitiveFunction from "../components/CognitiveFunction";
import { personTypesData } from "../data/personTypesData";
import { cogFuncAllConfig } from "../data/cogFuncAllConfig";

const PersonType = ({ type, chartId, radius }) => {
  const currType = type;
  const currTypeIdx = personTypesData.map((d) => d.type).indexOf(currType);
  const { funcsStack, type: personType } = personTypesData[currTypeIdx];
  const svgDims = { height: radius * 2, width: radius * 2, radius };
  const { width, height } = svgDims;

  const cogFuncOrder = ["intuition", "sensing", "thinking", "feeling"];
  const sortFunc = (a, b) =>
    cogFuncOrder.indexOf(a.cogFunc) - cogFuncOrder.indexOf(b.cogFunc);

  const config = cogFuncAllConfig["default"];

  return (
    <svg width={width} height={height} viewBox={`0 0 500 500`}>
      <circle cx="50%" cy="50%" r="50%" fill="#eee" />
      {funcsStack.sort(sortFunc).map((d, i) => (
        <CognitiveFunction
          key={`cogfunc-${i}`}
          type={personType}
          chartId={chartId}
          config={config}
          {...svgDims}
          {...d}
        />
      ))}
    </svg>
  );
};

export default PersonType;
