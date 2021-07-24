import { useState } from "react";
import styled from "styled-components";

import { personTypesData } from "../../data/personTypesData";
import { usePerTypeStates } from "./usePerTypeStates";

const Container = styled.div`
  padding: 20px;
  border: 1px solid #aaa;
  flex-grow: 1;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, calc(100% / 4 - (5px / 3)));
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 5px;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: ${({ value, currType }) =>
    value === currType ? "#e6ee9c" : "#eee"};
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export const useSelectorPerType = () => {
  const {
    cogFuncsStates: [{ ei }, { sn }, { tf }, { jp }]
  } = usePerTypeStates();
  const [selectedType, setSelectedType] = useState(ei.concat(sn, tf, jp));

  const typesRefSeq = personTypesData.map((d) => d.type);

  const handleSelectType = (e) => {
    setSelectedType(e.target.value);
  };

  const SelectorPerType = () => (
    <Container className="selector-per-type">
      <p>Select type</p>
      <ButtonGrid className="button-grid">
        {typesRefSeq.map((t, i) => (
          <Button
            key={i}
            value={t}
            currType={setSelectedType}
            onClick={handleSelectType}
          >
            {t}
          </Button>
        ))}
      </ButtonGrid>
    </Container>
  );

  return { SelectorPerType, selectedType, setSelectedType };
};

export default useSelectorPerType;
