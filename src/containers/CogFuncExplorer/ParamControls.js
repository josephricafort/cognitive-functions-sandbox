import styled from "styled-components";

import Slider from "../../components/ui/Slider";
import { usePrevious, round2Dec } from "../../utils/helpers";
import { cogFuncPriorities, cognitiveFunctions } from "../../utils/globalConst";
import { useEffect } from "react";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const ParamControls = ({ states, min, max, mbtiLetters, cogFuncsStates }) => {
  const [{ ns, setNs }, { tf, setTf }, { xvn, setXvn }] = states;
  let { ieLetter, nsLetter, tfLetter, pjLetter } = mbtiLetters;
  const [
    { ei: eiBtn, setEI },
    { sn: nsBtn, setSN },
    { tf: tfBtn, setTF },
    { jp: pjBtn, setJP }
  ] = cogFuncsStates;

  // useEffect(() => {
  //   setEI(ieLetter);
  //   setSN(nsLetter);
  //   setTF(tfLetter);
  //   setJP(pjLetter);
  // }, [ieLetter, nsLetter, tfLetter, pjLetter]);

  // const prevXvn = usePrevious(xvn);
  // const prevPjLetter = usePrevious(pjLetter);
  // if (pjLetter !== prevPjLetter) {
  //   setXvn(max - prevXvn);
  // }

  const prevEiBtn = usePrevious(eiBtn);
  const prevNsBtn = usePrevious(nsBtn);
  const prevTfBtn = usePrevious(tfBtn);
  const prevPjBtn = usePrevious(pjBtn);

  const ratio = [0.45, 0.3, 0.2, 0.05].map((d) => d * max * 2);
  const cfPrShort = (idx) => cogFuncPriorities.map((d) => d.short)[idx];
  const cfShort = (idx) => cognitiveFunctions.map((d) => d.short)[idx];
  const prObj = [ns, tf]
    .map((d) => [d, max - d])
    .flat()
    .map((d, i) => ({ cf: cfShort(i).toUpperCase(), val: d }))
    .sort((a, b) => a.val - b.val)
    .map((d, i) => ({ ...d, pr: cfPrShort(i), ratio: ratio[i] }));
  const prDom = prObj.find((d) => d.pr === "dom").cf;
  const prAux = prObj.find((d) => d.pr === "aux").cf;
  const isExvert = xvn < max / 2;

  if (eiBtn !== prevEiBtn) {
    if (eiBtn === "E") {
      setXvn(0.23);
    }
    if (eiBtn === "I") {
      setXvn(0.66);
    }
  }

  if (nsBtn !== prevNsBtn) {
    if (nsBtn === "N") {
      setNs(0.26);
    }
    if (nsBtn === "S") {
      setNs(0.74);
    }
  }

  if (tfBtn !== prevTfBtn) {
    if (tfBtn === "T") {
      setTf(0.24);
    }
    if (tfBtn === "F") {
      setTf(0.76);
    }
  }

  // if (pjBtn !== prevPjBtn) {
  //   setXvn(max - prevXvn);
  //   setNs(max - ns);
  //   setTf(max - tf);
  // }

  return (
    <Container>
      <Slider
        nameLeft="Extraverted (Dom.)"
        nameRight="Introverted (Dom.)"
        value={xvn}
        setValue={setXvn}
        min={min + 0.15}
        max={max - 0.15}
        step={0.01}
      />
      <Slider
        nameLeft="Intuition"
        nameRight="Sensing"
        value={ns}
        setValue={setNs}
        min={min}
        max={max}
        step={0.01}
      />
      <Slider
        nameLeft="Thinking"
        nameRight="Feeling"
        value={tf}
        setValue={setTf}
        min={min}
        max={max}
        step={0.01}
      />
    </Container>
  );
};

export default ParamControls;
