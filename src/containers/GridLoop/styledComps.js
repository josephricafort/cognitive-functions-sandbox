import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  ${({ chartAreaDim, prioritiesDim }) => `
    grid-template-columns: ${prioritiesDim.width}px ${chartAreaDim.width}px  ;
  `}
  grid-template-rows: auto;
  border: 1px solid #ccc;
  padding: 20px;
  width: 100%;
`;

export const ChartArea = styled.svg`
  position: relative;
`;

export const Chart = styled.g`
  -webkit-transition: transform 1s ease;
  -webkit-transition: -webkit-transform 1s ease;
  transition: -webkit-transform 1s ease;
  -o-transition: transform 1s ease;
  transition: transform 1s ease;
  transition: transform 1s ease, -webkit-transform 1s ease;
`;

export const PrioritiesArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-right: 1px solid #aaa;
`;

export const PrOutcome = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;

  &:nth-child(even) {
    height: 0;
  }
`;

export const PrLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ bgColor }) => (bgColor === "#9E9E9E" ? "#FFF" : "#000")};
  width: 100%;
  padding: 5px auto;
`;

export const XversionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  height: ${({ height }) => height}px;
  border-bottom: 1px solid #aaa;
  box-sizing: border-box;
`;

export const XversionLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ bgColor }) => (bgColor === "#9E9E9E" ? "#FFF" : "#000")};
  max-width: 100px;
  width: 100%;
  font-size: 14px;
  padding: 20px;
`;

export const Label = styled.text`
  color: #eee;
  font-size: 14px;
`;

export const CircleCatch = styled.circle`
  &:hover {
    cursor: pointer;
  }
`;
