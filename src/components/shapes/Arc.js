import React, { Fragment } from "react";
import styled from "styled-components";

import { describeArc } from "../../utils/helpers";

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
  fill,
  isExvert,
  gap,
  hasTransition
}) => {
  return (
    <Fragment>
      <Path
        className="arc"
        d={describeArc(x, y, radius - gap / 2, startAngle, endAngle, gap)}
        opacity={isExvert ? 0.35 : 1}
        fill={fill}
        hasTransition={hasTransition}
      />
    </Fragment>
  );
};

export default Arc;
