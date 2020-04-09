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
      const currentlyInfected = reportedCases * 10;
      switch (periodType.toLowerCase()) {
        case 'days': {
          const period = (timeToElapse / 3).toFixed(0);
          const infectionsByRequestedTime = (currentlyInfected * 2 ** period).toFixed(0);
          const severeCasesByRequestedTime = (0.15 * infectionsByRequestedTime).toFixed(0);
          const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - severeCasesByRequestedTime;
          const casesForICUByRequestedTime = (infectionsByRequestedTime * 0.05).toFixed();
          const casesForVentilatorsByRequestedTime = (infectionsByRequestedTime * 0.02).toFixed(0);
          const dollarsInFlight = 0.65 * avgDailyIncomeInUSD * period;
          break;
        }
        case 'weeks': {
          const requestedTimeWeeks = timeToElapse * 7;
          const period = requestedTimeWeeks / 3;
          const infectionsByRequestedTimeWeeks = (currentlyInfected * 2 ** period).toFixed();
          const severeCasesByRequestedTimeWeeks = (0.15 * infectionsByRequestedTimeWeeks).toFixed(0);
          const hospitalBedsByRequestedTimeWeeks = (totalHospitalBeds * 0.35).toFixed(0) - severeCasesByRequestedTimeWeeks;
          const casesForICUByRequestedTimeWeeks = (infectionsByRequestedTimeWeeks * 0.05).toFixed();
          const casesForVentilatorsByRequestedTimeWeeks = (infectionsByRequestedTimeWeeks * 0.02).toFixed(0);
          const dollarsInFlightWeeks = 0.65 * avgDailyIncomeInUSD * period;
          break;
        }
        case 'month': {
          const requestedTimeMonth = timeToElapse * 30;
          const period = requestedTimeMonth / 3;
          const infectionsByRequestedTimeMonth = currentlyInfected * (currentlyInfected * 2 ** period).toFixed();
          const severeCasesByRequestedTimeMonth = (0.15 * infectionsByRequestedTimeMonth).toFixed(0);
          const hospitalBedsByRequestedTimeMonth = (totalHospitalBeds * 0.35).toFixed(0) - severeCasesByRequestedTimeMonth;
          const casesForICUByRequestedTimeMonth = (infectionsByRequestedTimeMonth * 0.05).toFixed();
          const casesForVentilatorsByRequestedTimeMonth = (infectionsByRequestedTimeMonth * 0.02).toFixed(0);
          const dollarsInFlight = 0.65 * avgDailyIncomeInUSD * period;
          break;
        }
        default:
          break;
      }
    }
  };
};

export default covid19ImpactEstimator;
