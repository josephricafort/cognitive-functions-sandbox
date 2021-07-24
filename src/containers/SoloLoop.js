import PersonType from "../components/PersonType";

import { getRandomInt } from "../utils/helpers";

const SoloLoop = ({ personTypesArray, counter }) => {
  const randomInt = getRandomInt(0, personTypesArray.length - 1);

  return (
    <div>
      <h1>{personTypesArray[randomInt]}</h1>
      <svg id="svg" width="500" height="500" viewBox={`0 0 500 500`}>
        <PersonType type={personTypesArray[randomInt]} chartId="chartloop" />
      </svg>
    </div>
  );
};

export default SoloLoop;
