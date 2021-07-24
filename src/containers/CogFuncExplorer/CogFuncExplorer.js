import { useState } from "react";
import styled from "styled-components";

import CognitiveFunction from "../../components/CognitiveFunction";
import ParamControls from "./ParamControls";
import SelectorPerFunc from "../../components/ui/SelectorPerFunc";
import { usePerTypeStates } from "../../components/ui/usePerTypeStates";
import { cognitiveFunctions, cogFuncPriorities } from "../../utils/globalConst";
import { cogFuncAllConfig } from "../../data/cogFuncAllConfig";
import { round2Dec } from "../../utils/helpers";

const Container = styled.div``;

const CogFuncExplorer = ({ type = "ESTJ", max = 0.99, min = 0.01 }) => {
  const ratio = [max * 0.5, max * 0.25, max * 0.12, max * 0.07];
  const maxDomInf = ratio[0] + ratio[3];
  const maxAuxTer = ratio[1] + ratio[2];

  const domAux = ["dominant", "auxiliary"];
  const intSens = ["intuition", "sensing"];
  const thinkFeel = ["thinking", "feeling"];

  const [xvn, setXvn] = useState(round2Dec(max * 0.35));
  const [ns, setNs] = useState(round2Dec(max * 0.15));
  const [tf, setTf] = useState(round2Dec(max * 0.75));
  const states = [
    { ns, setNs },
    { tf, setTf },
    { xvn, setXvn }
  ];

  const paramValues = {
    n: ns,
    s: round2Dec(max - ns),
    t: tf,
    f: round2Dec(max - tf)
  };

  // const funcsStack = [
  //   { cogFunc: "thinking", isExvert: true, stackFunc: "dominant" },
  //   { cogFunc: "sensing", isExvert: false, stackFunc: "auxiliary" },
  //   { cogFunc: "intuition", isExvert: true, stackFunc: "tertiary" },
  //   { cogFunc: "feeling", isExvert: false, stackFunc: "inferior" }
  // ];

  /* Generate function stack */
  const cogFuncShortIdx = (cfshort) =>
    cognitiveFunctions.map((d) => d.short).indexOf(cfshort);
  const isOdd = (v) => v % 2 !== 0;
  const isDomExvert = xvn < max / 2;
  const funcsStack = Object.entries(paramValues)
    .sort((a, b) => a[1] - b[1])
    .map((d, i) => {
      const cfshort = d[0];

      const isExvert = isOdd(i) ? !isDomExvert : isDomExvert;
      return {
        cogFunc: cognitiveFunctions[cogFuncShortIdx(cfshort)].function,
        isExvert,
        stackFunc: cogFuncPriorities[i].function
      };
    });

  const sfIdx = (sf) => funcsStack.map((d) => d.stackFunc).indexOf(sf);
  const cogFuncShort = (cf) =>
    cognitiveFunctions[cognitiveFunctions.map((d) => d.function).indexOf(cf)]
      .short;
  const getFuncVal = (sf = "dominant") => {
    const { cogFunc } = funcsStack[sfIdx(sf)];

    if (sf === "dominant") {
      return paramValues[cogFuncShort(cogFunc)];
    } else return paramValues[cogFuncShort(cogFunc)];
  };

  /* Setup custom config styles for the chart to use */
  const { cogFuncConfig, stackFuncConfig } = cogFuncAllConfig["default"];
  const sfConfigCustom = stackFuncConfig.map((sf) => {
    const { stackFunc } = sf;

    return {
      ...sf,
      style: {
        rotation: -18 * 5 * getFuncVal(stackFunc)
      }
    };
  });
  const xvnConfigCustom = [
    {
      xVersFunc: "extraversion",
      style: { areaRatio: xvn / 1, innerRadiusRatio: xvn }
    },
    {
      xVersFunc: "introversion",
      style: { areaRatio: 1 / xvn, innerRadiusRatio: xvn }
    }
  ];

  const config = {
    cogFuncConfig,
    stackFuncConfig: sfConfigCustom,
    xVersionConfig: xvnConfigCustom
  };

  const radius = 150;
  const svgDims = { height: radius * 2, width: radius * 2, radius };
  const { width, height } = svgDims;

  const getDomCogFunc = (daArr, pjArr) =>
    funcsStack
      .filter((d) => daArr.some((e) => e === d.stackFunc))
      .filter((d) => pjArr.some((e) => e === d.cogFunc))[0].cogFunc;
  const isPOrJ = (setFunc, pr) =>
    setFunc.some((d) => d === funcsStack[sfIdx(pr)].cogFunc) ? "P" : "J";
  let mbtiLetters = {
    ieLetter: isDomExvert ? "E" : "I",
    nsLetter: cogFuncShort(getDomCogFunc(domAux, intSens)).toUpperCase(),
    tfLetter: cogFuncShort(getDomCogFunc(domAux, thinkFeel)).toUpperCase(),
    pjLetter: isDomExvert
      ? isPOrJ(intSens, "dominant")
      : isPOrJ(intSens, "auxiliary")
  };
  let { ieLetter, nsLetter, tfLetter, pjLetter } = mbtiLetters;

  /* Selector Per Function Buttons */
  const { cogFuncsArrs, cogFuncsStates } = usePerTypeStates();

  return (
    <Container className="cogfunc-explorer-container">
      <h2>
        {ieLetter} {nsLetter} {tfLetter} {pjLetter}
      </h2>
      <SelectorPerFunc
        cogFuncsArrs={cogFuncsArrs}
        cogFuncsStates={cogFuncsStates}
      />
      <svg width={width} height={height} viewBox={`0 0 500 500`}>
        {funcsStack.map((d, i) => (
          <CognitiveFunction
            key={`cogfunc-${i}`}
            type={type}
            chartId={"cogfunc-explorer"}
            config={config}
            hasTransition={false}
            {...svgDims}
            {...d}
          />
        ))}
      </svg>
      <ParamControls
        states={states}
        min={min}
        max={max}
        mbtiLetters={mbtiLetters}
        cogFuncsStates={cogFuncsStates}
      />
    </Container>
  );
};

export default CogFuncExplorer;
