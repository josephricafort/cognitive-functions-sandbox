import { personTypesData } from "./personTypesData";

export const cogFuncSequence = [
  {
    scenario: 1,
    description: "Main sequence",
    sequence: ["dominant", "auxiliary", "tertiary", "inferior"]
  },
  {
    scenario: 1,
    description:
      "Swaping auxiliary and tertiary functions of the main sequence",
    sequence: ["dominant", "tertiary", "auxiliary", "inferior"]
  },
  {
    scenario: 2,
    description:
      "Swaping dominant and auxiliary functions. The secondary sequence",
    sequence: ["auxiliary", "dominant", "inferior", "tertiary"]
  },
  {
    scenario: 2,
    description:
      "Swaping tertiary and auxiliary functions of the secondary sequence",
    sequence: ["tertiary", "dominant", "inferior", "auxiliary"]
  },
  {
    scenario: 3,
    description:
      "Swaping inferior and dominant functions of the secondary sequence",
    sequence: ["auxiliary", "inferior", "dominant", "tertiary"]
  },
  {
    scenario: 3,
    description:
      "Swaping inferior and dominant, tertiary and auxiliary functions of the secondary sequence",
    sequence: ["tertiary", "inferior", "dominant", "auxiliary"]
  },
  {
    scenario: 4,
    description: "Swaping dominant and inferior functions of the main sequence",
    sequence: ["inferior", "auxiliary", "tertiary", "dominant"]
  },
  {
    scenario: 4,
    description:
      "Swaping dominant and inferior, and tertiary and auxiliary functions of the main sequence",
    sequence: ["inferior", "tertiary", "auxiliary", "dominant"]
  }
];

export const xversionFlips = [
  {
    scenario: 1,
    shortLabel: "0 flips",
    description:
      "None of the cognitive functions flipped extraversion - introversion.",
    flips: []
  },
  {
    scenario: 2,
    shortLabel: "aux-ter (2-flips)",
    description:
      "Auxiliary and tertiary functions flipped extraversion - introversion.",
    flips: ["auxiliary", "tertiary"]
  },
  {
    scenario: 3,
    shortLabel: "dom-inf (2-flips)",
    description:
      "Dominant and inferior functions flipped extraversion - introversion.",
    flips: ["dominant", "inferior"]
  },
  {
    scenario: 4,
    shortLabel: "both (4-flips)",
    description:
      "Both dominant and inferior, and auxiliary and tertiary functions flipped extraversion - introversion.",
    flips: ["dominant", "auxiliary", "tertiary", "inferior"]
  }
];

export const compareTypeTable = (type) => {
  const typeIdx = personTypesData.map((p) => p.type).indexOf(type);
  const { funcsStack } = personTypesData[typeIdx];
  const stackFuncOrder = ["dominant", "auxiliary", "tertiary", "inferior"];

  const sortStack = (a, b) =>
    stackFuncOrder.indexOf(a.stackFunc) - stackFuncOrder.indexOf(b.stackFunc);
  const funcsStackSorted = funcsStack.sort(sortStack).map((d) => d);
  const cogFuncTypeSeq = funcsStackSorted.map((d) => d.cogFunc);
  const xversionTypeSeq = funcsStackSorted.map((d) => d.isExvert);

  const table = personTypesData.map((personType) => {
    const { type: typeToCompare, funcsStack: funcsStackTC } = personType;

    const sortCogFunc = (a, b) =>
      cogFuncTypeSeq.indexOf(a.cogFunc) - cogFuncTypeSeq.indexOf(b.cogFunc);
    const funcsStackTCSorted = funcsStackTC.sort(sortCogFunc).map((d) => d);
    const stackFuncTCSeq = funcsStackTCSorted.map((d) => d.stackFunc);
    const xversionTCSeq = funcsStackTCSorted
      .map((d) => d.isExvert)
      .map((b, i) =>
        (b ? 1 : 0) ^ (xversionTypeSeq[i] ? 1 : 0) ? stackFuncOrder[i] : ""
      )
      .filter((d) => d !== "");

    const stackTCIndex = cogFuncSequence
      .map((d) => JSON.stringify(d.sequence))
      .indexOf(JSON.stringify(stackFuncTCSeq));

    const xversionTCIndex = xversionFlips
      .map((d) => JSON.stringify(d.flips))
      .indexOf(JSON.stringify(xversionTCSeq));

    const { scenario: cogFuncScenario } = cogFuncSequence[stackTCIndex];
    const { scenario: xversionScenario } = xversionFlips[xversionTCIndex];

    return { type: typeToCompare, cogFuncScenario, xversionScenario };
  });

  const rank = table
    .map(({ cogFuncScenario, xversionScenario, ...d }) => ({
      cogFuncScenario,
      xversionScenario: xversionScenario + 2,
      weight: cogFuncScenario * (xversionScenario + 2),
      ...d
    }))
    .sort((a, b) => a.weight - b.weight)
    .map((d) => d.type);

  return { table, rank };
};
