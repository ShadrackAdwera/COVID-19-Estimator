/* eslint-disable max-len */

const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    region, periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
  // functions
  function normalizeTime(timeSelected) {
    let period = 0;
    switch (periodType.toLowerCase()) {
      case 'days': {
        period = timeSelected / 3;
        break;
      }
      case 'weeks': {
        period = (timeSelected * 7) / 3;
        break;
      }
      case 'months': {
        period = (timeSelected * 30) / 3;
        break;
      }
      default:
        break;
    }
    return period;
  }

  // impact variables
  const normalizedPeriod = normalizeTime(timeToElapse);
  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = (impactCurrentlyInfected * 2 ** normalizedPeriod).toFixed(0);
  const impactSevereCasesByRequestedTime = (0.15 * impactInfectionsByRequestedTime).toFixed(0);
  const impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - impactSevereCasesByRequestedTime;
  const impactCasesForICUByRequestedTime = (impactInfectionsByRequestedTime * 0.05).toFixed();
  const impactCasesForVentilatorsByRequestedTime = (impactInfectionsByRequestedTime * 0.02).toFixed(0);
  const impactDollarsInFlight = impactInfectionsByRequestedTime * region.avgDailyIncomeInUSD * normalizedPeriod;

  // severe impact variables
  const severeImpactCurrentlyInfected = data.reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * 2 ** normalizedPeriod).toFixed(0);
  const severeImpactSevereCasesByRequestedTime = (0.15 * severeImpactInfectionsByRequestedTime).toFixed(0);
  const severeImpactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35).toFixed(0) - severeImpactSevereCasesByRequestedTime;
  const severeImpactCasesForICUByRequestedTime = (severeImpactInfectionsByRequestedTime * 0.05).toFixed();
  const severeImpactCasesForVentilatorsByRequestedTime = (severeImpactInfectionsByRequestedTime * 0.02).toFixed(0);
  const severeImpactDollarsInFlight = severeImpactInfectionsByRequestedTime * region.avgDailyIncomeInUSD * normalizedPeriod;

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
