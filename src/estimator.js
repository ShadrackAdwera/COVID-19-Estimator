/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const covid19ImpactEstimator = (data) => {
  const input = data;
  // functions
  function normalizeTime(timeToElapse) {
    let period = 0;
    switch (data.periodType.toLowerCase()) {
      case 'days': {
        period = data.timeToElapse / 3;
        break;
      }
      case 'weeks': {
        period = (data.timeToElapse * 7) / 3;
        break;
      }
      case 'months': {
        period = (data.timeToElapse * 30) / 3;
        break;
      }
      default:
        break;
    }
    return period;
  }

  // impact variables
  const normalizedPeriod = normalizeTime(timeToElapse);
  const impactCurrentlyInfected = data.reportedCases * 10;
  const impactInfectionsByRequestedTime = (impactCurrentlyInfected * 2 ** normalizedPeriod).toFixed(0);
  const impactSevereCasesByRequestedTime = (0.15 * impactInfectionsByRequestedTime).toFixed(0);
  const impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - impactSevereCasesByRequestedTime;
  const impactCasesForICUByRequestedTime = (impactInfectionsByRequestedTime * 0.05).toFixed();
  const impactCasesForVentilatorsByRequestedTime = (impactInfectionsByRequestedTime * 0.02).toFixed(0);
  const impactDollarsInFlight = impactInfectionsByRequestedTime * avgDailyIncomeInUSD * normalizedPeriod;

  // severe impact variables
  const severeImpactCurrentlyInfected = data.reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * 2 ** normalizedPeriod).toFixed(0);
  const severeImpactSevereCasesByRequestedTime = (0.15 * severeImpactInfectionsByRequestedTime).toFixed(0);
  const severeImpactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - severeImpactSevereCasesByRequestedTime;
  const severeImpactCasesForICUByRequestedTime = (severeImpactInfectionsByRequestedTime * 0.05).toFixed();
  const severeImpactCasesForVentilatorsByRequestedTime = (severeImpactInfectionsByRequestedTime * 0.02).toFixed(0);
  const severeImpactDollarsInFlight = severeImpactInfectionsByRequestedTime * avgDailyIncomeInUSD * normalizedPeriod;

  return {
    data: input,
    impact: {
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: severeImpactDollarsInFlight

    }
  };
};

export default covid19ImpactEstimator;
