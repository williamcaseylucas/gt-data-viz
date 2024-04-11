export interface CSVTypes {
  date: Date;
  state: string;
  death: number;
  deathConfirmed: number;
  deathIncrease: number;
  deathProbable: number;
  hospitalized: number;
  hospitalizedCumulative: number;
  hospitalizedCurrently: number;
  hospitalizedIncrease: number;
  inIcuCumulative: number;
  inIcuCurrently: number;
  negative: number;
  negativeIncrease: number;
  negativeTestsAntibody: number;
  negativeTestsPeopleAntibody: number;
  negativeTestsViral: number;
  onVentilatorCumulative: number;
  onVentilatorCurrently: number;
  positive: number;
  positiveCasesViral: number;
  positiveIncrease: number;
  positiveScore: number;
  positiveTestsAntibody: number;
  positiveTestsAntigen: number;
  positiveTestsPeopleAntibody: number;
  positiveTestsPeopleAntigen: number;
  positiveTestsViral: number;
  recovered: number;
  totalTestEncountersViral: number;
  totalTestEncountersViralIncrease: number;
  totalTestResults: number;
  totalTestResultsIncrease: number;
  totalTestsAntibody: number;
  totalTestsAntigen: number;
  totalTestsPeopleAntibody: number;
  totalTestsPeopleAntigen: number;
  totalTestsPeopleViral: number;
  totalTestsPeopleViralIncrease: number;
  totalTestsViral: number;
  totalTestsViralIncrease: number;
}

export interface BAR_DATA {
  state: string;
  positiveSum: number;
  hospitalizeSum: number;
  deathSum: number;
}
