export const cogFuncAllConfig = {
  default: {
    cogFuncConfig: [
      { cogFunc: "intuition", style: { fill: "#66BB6A", quad: [0, 0] } },
      { cogFunc: "sensing", style: { fill: "#FFB74D", quad: [0, 1] } },
      { cogFunc: "thinking", style: { fill: "#4FC3F7", quad: [1, 0] } },
      { cogFunc: "feeling", style: { fill: "#F06292", quad: [1, 1] } }
    ],
    stackFuncConfig: [
      { stackFunc: "dominant", style: { rotation: -18 * 0 } },
      { stackFunc: "auxiliary", style: { rotation: -18 * 2 } },
      { stackFunc: "tertiary", style: { rotation: -18 * 3 } },
      { stackFunc: "inferior", style: { rotation: -18 * 4.5 } }
    ],
    xVersionConfig: [
      { xVersFunc: "extraversion", style: { areaRatio: 10 / 3 } },
      { xVersFunc: "introversion", style: { areaRatio: 3 / 5 } }
    ]
  },
  extraIntro: {
    cogFuncConfig: [
      { cogFunc: "intuition", style: { fill: "#333333", quad: [0, 0] } },
      { cogFunc: "sensing", style: { fill: "#333333", quad: [0, 1] } },
      { cogFunc: "thinking", style: { fill: "#333333", quad: [1, 0] } },
      { cogFunc: "feeling", style: { fill: "#333333", quad: [1, 1] } }
    ],
    stackFuncConfig: [
      { stackFunc: "dominant", style: { rotation: -18 * -1 } },
      { stackFunc: "auxiliary", style: { rotation: -18 * -1 } },
      { stackFunc: "tertiary", style: { rotation: -18 * 5 } },
      { stackFunc: "inferior", style: { rotation: -18 * 5 } }
    ],
    xVersionConfig: [
      { xVersFunc: "extraversion", style: { areaRatio: 10 / 3 } },
      { xVersFunc: "introversion", style: { areaRatio: 3 / 5 } }
    ]
  },
  perceiveJudge: {
    cogFuncConfig: [
      { cogFunc: "intuition", style: { fill: "#DCE775", quad: [0, 0] } },
      { cogFunc: "sensing", style: { fill: "#DCE775", quad: [0, 1] } },
      { cogFunc: "thinking", style: { fill: "#BA68C8", quad: [1, 0] } },
      { cogFunc: "feeling", style: { fill: "#BA68C8", quad: [1, 1] } }
    ],
    stackFuncConfig: [
      { stackFunc: "dominant", style: { rotation: 18 * -2 } },
      { stackFunc: "auxiliary", style: { rotation: 18 * -2 } },
      { stackFunc: "tertiary", style: { rotation: 18 * -2 } },
      { stackFunc: "inferior", style: { rotation: 18 * -2 } }
    ],
    xVersionConfig: [
      { xVersFunc: "extraversion", style: { areaRatio: 2 } },
      { xVersFunc: "introversion", style: { areaRatio: 2 } }
    ]
  }
};
