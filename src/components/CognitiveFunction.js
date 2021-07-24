import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import Arc from "../components/shapes/Arc";
import ArcHollow from "../components/shapes/ArcHollow";
// import { cogFuncAllConfig } from "../data/cogFuncAllConfig";

const ClipPathStyled = styled.clipPath`
  transition: ${({ hasTransition }) =>
    hasTransition ? `all 1s ease` : `none`};
  transform-origin: center;
`;

const defaultStylesProps = {
  x: 250,
  y: 250,
  startAngle: -90,
  endAngle: 0,
  radiusFull: 250,
  gap: 10
};

const CognitiveFunction = ({
  type = "ESTJ",
  cogFunc: currCogFunc,
  isExvert = true,
  stackFunc: currStackFunc,
  chartId = "",
  stylesProps = defaultStylesProps,
  config,
  hasTransition
}) => {
  const { cogFuncConfig, stackFuncConfig, xVersionConfig } = config;

  const cogFuncIdx = cogFuncConfig.map((d) => d.cogFunc).indexOf(currCogFunc);
  const isExvertIdx = isExvert ? 0 : 1;
  const stackFuncIdx = stackFuncConfig
    .map((d) => d.stackFunc)
    .indexOf(currStackFunc);

  const {
    style: { fill, quad }
  } = cogFuncConfig[cogFuncIdx];
  const {
    style: { rotation }
  } = stackFuncConfig[stackFuncIdx];
  const {
    style: { areaRatio, innerRadiusRatio }
  } = xVersionConfig[isExvertIdx];

  const commonProps = {
    ...stylesProps,
    isExvert,
    fill,
    hasTransition
  };

  const { x, y, radiusFull } = commonProps;
  // const rScale = (areaRatio) => radiusFull / Math.sqrt(areaRatio + 1);
  const rScale = (ir) => radiusFull * ir;

  const arcHollowProps = {
    ...commonProps,
    radius: radiusFull,
    // radiusHollow: rScale(areaRatio)
    radiusHollow: rScale(innerRadiusRatio)
  };
  const arcProps = {
    ...commonProps,
    // radius: rScale(areaRatio)
    radius: rScale(innerRadiusRatio)
  };

  const isExvertLabel = isExvert ? "extravert" : "introvert";
  const uniqueId = `${chartId}-${type}-${currCogFunc}-${currStackFunc}-${isExvertLabel}`;
  const cogFuncId = `cogfunc-${uniqueId}`;
  const clipPathId = `clip-path-${uniqueId}`;
  const transformClipPath = `rotate(${rotation})`;
  const transformCogFunc = `scale(${quad[0] ? -1 : 1} ${quad[1] ? -1 : 1})`;

  return (
    <g
      className="cognitive-function"
      transform={transformCogFunc}
      style={{ transformOrigin: "center" }}
    >
      <Transition classNames="cog-func-transition" in={true} timeout={1000}>
        <ClipPathStyled
          id={cogFuncId}
          transform={transformClipPath}
          hasTransition={hasTransition}
        >
          <rect id={clipPathId} width={x} height={y} />
        </ClipPathStyled>
      </Transition>
      {/* <use xlinkHref={`#${clipPathId}`} fill="#eee" /> */}
      <g className="arcs" clipPath={`url(#${cogFuncId})`}>
        <ArcHollow {...arcHollowProps} />
        <Arc {...arcProps} />
      </g>
    </g>
  );
};

export default CognitiveFunction;
