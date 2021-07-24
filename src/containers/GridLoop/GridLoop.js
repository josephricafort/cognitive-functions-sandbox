import * as d3 from "d3";

import PersonType from "../../components/PersonType";
import {
  cogFuncSequence,
  xversionFlips,
  compareTypeTable
} from "../../data/cogFuncCompareData";
import { personTypesData } from "../../data/personTypesData";
import {
  Grid,
  ChartArea,
  Chart,
  PrioritiesArea,
  PrOutcome,
  PrLabel,
  XversionArea,
  XversionLabel,
  Label,
  CircleCatch
} from "./styledComps";

const ptypeProps = { r: 30 };

const gridProps = {
  nCols: 4,
  nRows: 4,
  gap: 50
};

const greyColors = ["#9E9E9E", "#BDBDBD", "#EEEEEE", "#F5F5F5"];

const GridLoop = ({ type, setType, counter }) => {
  const { table } = compareTypeTable(type);
  const { r } = ptypeProps;
  const { nCols, nRows, gap } = gridProps;

  const chartAreaDim = {
    height: r * 2 * nRows + gap * (nRows - 1),
    width: r * 2 * nCols + gap * (nCols - 1)
  };

  const prioritiesDim = {
    height: chartAreaDim.height,
    width: 200
  };

  const xversionDim = {
    height: 50,
    width: chartAreaDim.width
  };

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = chartAreaDim.width - margin.left - margin.right - 2 * r;
  const height = chartAreaDim.height - margin.top - margin.bottom - 2 * r;

  const xScale = d3.scaleLinear().domain([1, nCols]).range([0, width]);
  const yScale = d3.scaleLinear().domain([1, nRows]).range([0, height]);

  const personTypeStdSeq = personTypesData.map((d) => d.type);

  const handleClickChart = (type) => {
    setType(type);
  };

  const prColorScale = d3
    .scaleOrdinal()
    .domain(cogFuncSequence[0].sequence)
    .range(greyColors);

  const xvnColorScale = d3
    .scaleOrdinal()
    .domain(xversionFlips.map((vn) => vn.shortLabel))
    .range(greyColors);

  const XversionAxis = () =>
    xversionFlips.map((vn, i) => (
      <XversionLabel key={i} bgColor={xvnColorScale(vn.shortLabel)}>
        {vn.shortLabel}
      </XversionLabel>
    ));

  const PrioritiesAxis = () => {
    return cogFuncSequence.map((cf, i) => (
      <PrOutcome key={i} height={r} gap={gap}>
        {cf.sequence.map((p, j) => (
          <PrLabel key={j} bgColor={prColorScale(p)}>
            {p.substring(0, 3)}
          </PrLabel>
        ))}
      </PrOutcome>
    ));
  };

  return (
    <Grid chartAreaDim={chartAreaDim} prioritiesDim={prioritiesDim}>
      <div className="type-show">
        <h2>{type}</h2>
      </div>
      <XversionArea {...xversionDim}>
        <XversionAxis />
      </XversionArea>
      <PrioritiesArea {...prioritiesDim}>
        <PrioritiesAxis />
      </PrioritiesArea>
      <ChartArea className="chart-area" {...chartAreaDim}>
        {personTypeStdSeq.map((d, i) => {
          const compareTypes = [type, d];
          const currType = compareTypes[counter % 2];
          const {
            cogFuncScenario: cogFuncN,
            xversionScenario: xversionN
          } = table[table.map((e) => e.type).indexOf(d)];

          const translateChart = `translate(${
            xScale(xversionN) + margin.left
          }, ${yScale(cogFuncN) + margin.top})`;

          return (
            <Chart
              className={d.toLowerCase()}
              key={i}
              transform={translateChart}
            >
              {type === d && <circle cx={r} cy={r} r={r + 10} fill="#e6ee9c" />}
              <Label>
                {d} ({cogFuncN * xversionN})
              </Label>
              <PersonType
                type={currType}
                chartId={`chartgrid-${i}`}
                radius={r}
              />
              <CircleCatch
                cx={r}
                cy={r}
                r={r}
                fill="transparent"
                value={d}
                onClick={() => handleClickChart(d)}
              />
            </Chart>
          );
        })}
      </ChartArea>
    </Grid>
  );
};

export default GridLoop;
