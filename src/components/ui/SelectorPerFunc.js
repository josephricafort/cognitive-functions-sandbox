import styled from "styled-components";

const SelectorButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border: 1px solid #333;
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-bottom: 5px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  background-color: "#eee";
  ${({ letter, arrFuncState }) =>
    letter === arrFuncState &&
    `
    background-color: #e6ee9c;
    font-weight: 700;
  `};

  &:hover {
    opacity: 1;
  }
`;

const SelectorPerFunc = ({ cogFuncsArrs, cogFuncsStates }) => {
  const [eiArr, snArr, tfArr, jpArr] = cogFuncsArrs;
  const [
    { ei, setEI },
    { sn, setSN },
    { tf, setTF },
    { jp, setJP }
  ] = cogFuncsStates;

  const getFuncState = (letter) => {
    const either = (d) => d === letter;

    if (eiArr.some(either)) return ei;
    else if (snArr.some(either)) return sn;
    else if (tfArr.some(either)) return tf;
    else if (jpArr.some(either)) return jp;
  };

  const handleButtonClick = (letter) => {
    const either = (d) => d === letter;

    if (eiArr.some(either)) {
      setEI(letter);
    } else if (snArr.some(either)) {
      setSN(letter);
    } else if (tfArr.some(either)) {
      setTF(letter);
    } else if (jpArr.some(either)) {
      setJP(letter);
    }
  };

  return (
    <div className="selector">
      <SelectorButtons className="selector-buttons">
        {cogFuncsArrs.map((group, i) => (
          <ButtonGroup key={`btn-group-${i}`} className="btn-group">
            {group.map((letter, j) => (
              <Button
                key={`button-${j}-${letter}`}
                onClick={() => handleButtonClick(letter)}
                letter={letter}
                arrFuncState={getFuncState(letter)}
              >
                {letter}
              </Button>
            ))}
          </ButtonGroup>
        ))}
      </SelectorButtons>
    </div>
  );
};

export default SelectorPerFunc;
