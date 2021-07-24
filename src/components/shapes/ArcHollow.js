import React, { Fragment } from "react";
import styled from "styled-components";

import { describeArcHollow } from "../../utils/helpers";

const Path = styled.path`
  ${({ hasTransition }) =>
    hasTransition
      ? `
      -webkit-transition: all 1s ease;
      -o-transition: all 1s ease;
      transition: all 1s ease;`
      : `transition: none;`}
  -webkit-transition: transform 0.35s ease;
  -o-transition: transform 0.35s ease;
  transition: transform 0.35s ease;
`;

const Arc = ({
  x,
  y,
  radius,
  startAngle,
  endAngle,
  radiusHollow,
  fill,
  isExvert,
  gap,
  hasTransition
}) => {
  return (
    <Fragment>
      <Path
        className="arc"
        d={describeArcHollow(
          x,
          y,
          radius,
          startAngle,
          endAngle,
          radiusHollow + gap / 2,
          gap
        )}
        opacity={isExvert ? 1 : 0.35}
        fill={fill}
        hasTransition={hasTransition}
      />
    </Fragment>
  );
};

export default Arc;
