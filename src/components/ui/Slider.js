import styled from "styled-components";

const Container = styled.div`
  margin: 20px auto;

  .names {
    display: flex;
    justify-content: space-between;
  }

  input {
    cursor: pointer;
    width: 100%;
  }
`;

const Label = styled.span`
  font-weight: ${({ isHighlighted }) => (isHighlighted ? `700` : `500`)};
`;

const Slider = ({
  nameLeft = "",
  nameRight = "",
  min = 0,
  max = 1,
  value = 0.5,
  setValue,
  step = 0.01
}) => {
  const isHighlightedLeft = (val) => val < max / 2;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container className="slider-container">
      <div className="names">
        <Label className="name-left" isHighlighted={isHighlightedLeft(value)}>
          {nameLeft}
        </Label>
        <Label className="name-right" isHighlighted={!isHighlightedLeft(value)}>
          {nameRight}
        </Label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
    </Container>
  );
};

export default Slider;
