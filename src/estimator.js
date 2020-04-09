/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact() {
      const currentlyInfected = reportedCases * 10;
      let period = 0;
      switch (periodType.toLowerCase()) {
        case 'days': {
          const requestedTime = timeToElapse * 1;
          period = (requestedTime / 3).toFixed(0);
          break;
        }
        case 'weeks': {
          const requestedTime = timeToElapse * 7;
          period = requestedTime / 3;
          break;
        }
        case 'month': {
          const requestedTime = timeToElapse * 30;
          period = requestedTime / 3;
          break;
        }
        default:
          break;
      }
      const infectionsByRequestedTime = (currentlyInfected * 2 ** period).toFixed(0);
      const severeCasesByRequestedTime = (0.15 * infectionsByRequestedTime).toFixed(0);
      const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - severeCasesByRequestedTime;
      const casesForICUByRequestedTime = (infectionsByRequestedTime * 0.05).toFixed();
      const casesForVentilatorsByRequestedTime = (infectionsByRequestedTime * 0.02).toFixed(0);
      const dollarsInFlight = 0.65 * avgDailyIncomeInUSD * period;
    },
    severeImpact() {
      const currentlyInfected = reportedCases * 50;
      let period = 0;
      switch (periodType.toLowerCase()) {
        case 'days': {
          const requestedTime = timeToElapse * 1;
          period = (requestedTime / 3).toFixed(0);
          break;
        }
        case 'weeks': {
          const requestedTime = timeToElapse * 7;
          period = requestedTime / 3;
          break;
        }
        case 'month': {
          const requestedTime = timeToElapse * 30;
          period = requestedTime / 3;
          break;
        }
        default:
          break;
      }
      const infectionsByRequestedTime = (currentlyInfected * 2 ** period).toFixed(0);
      const severeCasesByRequestedTime = (0.15 * infectionsByRequestedTime).toFixed(0);
      const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - severeCasesByRequestedTime;
      const casesForICUByRequestedTime = (infectionsByRequestedTime * 0.05).toFixed();
      const casesForVentilatorsByRequestedTime = (infectionsByRequestedTime * 0.02).toFixed(0);
      const dollarsInFlight = 0.65 * avgDailyIncomeInUSD * period;
    }
  };
};

export default covid19ImpactEstimator;
