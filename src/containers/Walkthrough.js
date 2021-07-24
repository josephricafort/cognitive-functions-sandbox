import CognitiveFunction from "../components/CognitiveFunction";
import { walkthroughData } from "../data/walkthroughData";

const Walkthrough = ({ counter }) => {
  const { types, section: configType } = walkthroughData[1];

  const { funcsStack, type } = types[counter % 2];
  const cogFuncOrder = ["intuition", "sensing", "thinking", "feeling"];
  const sortFunc = (a, b) =>
    cogFuncOrder.indexOf(a.cogFunc) - cogFuncOrder.indexOf(b.cogFunc);
  const isConfigTypeNotDefault = ["extraIntro", "perceiveJudge"].some(
    (d) => d === configType
  );

  return (
    <div>
      <svg width="500" height="500" viewBox={`0 0 500 500`}>
        {funcsStack.sort(sortFunc).map((d, i) => (
          <CognitiveFunction
            {...d}
            key={i}
            type={type}
            chartId="chartwalkthrough"
            configType={isConfigTypeNotDefault ? configType : "default"}
          />
        ))}
      </svg>
    </div>
  );
};

export default Walkthrough;
