import { useState } from "react";

import { cogFuncsArrs } from "../../utils/globalConst";

export function usePerTypeStates() {
  const [eiArr, snArr, tfArr, jpArr] = cogFuncsArrs;

  const [ei, setEI] = useState(eiArr[0]);
  const [sn, setSN] = useState(snArr[0]);
  const [tf, setTF] = useState(tfArr[0]);
  const [jp, setJP] = useState(jpArr[0]);
  const cogFuncsStates = [
    { ei, setEI },
    { sn, setSN },
    { tf, setTF },
    { jp, setJP }
  ];

  return { cogFuncsArrs, cogFuncsStates };
}
