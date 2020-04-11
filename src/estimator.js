
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
  const impactInfctsByTime = (impactCurrentlyInfected * 2 ** normalizedPeriod).toFixed(0);
  const impactSvreByRequestedTime = (0.15 * impactInfctsByTime).toFixed(0);
  const impactBedsByTime = (totalHospitalBeds * 0.35).toFixed(0) - impactSvreByRequestedTime;
  const impactCasesForICUByRequestedTime = (impactInfctsByTime * 0.05).toFixed();
  const impactCasesForVentilatorsByRequestedTime = (impactInfctsByTime * 0.02).toFixed(0);
  const impactDollarsInFlight = impactInfctsByTime * region.avgDailyIncomeInUSD * normalizedPeriod;

  // severe impact variables
  const severeCurrentlyInfected = data.reportedCases * 50;
  const svImpactInfectionsByTime = (severeCurrentlyInfected * 2 ** normalizedPeriod).toFixed(0);
  const svImpactSevereRequestedTime = (0.15 * svImpactInfectionsByTime).toFixed(0);
  const severeImpactBeds = (totalHospitalBeds * 0.35).toFixed(0) - svImpactSevereRequestedTime;
  const severeImpactCasesForICUByRequestedTime = (svImpactInfectionsByTime * 0.05).toFixed();
  const severeImpactVentilators = (svImpactInfectionsByTime * 0.02).toFixed(0);
  const sDollarsInFlight = svImpactInfectionsByTime * region.avgDailyIncomeInUSD * normalizedPeriod;

  return {
    data: input,
    impact: {
      infectionsByRequestedTime: impactInfctsByTime,
      severeCasesByRequestedTime: impactSvreByRequestedTime,
      hospitalBedsByRequestedTime: impactBedsByTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      infectionsByRequestedTime: svImpactInfectionsByTime,
      severeCasesByRequestedTime: svImpactSevereRequestedTime,
      hospitalBedsByRequestedTime: severeImpactBeds,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactVentilators,
      dollarsInFlight: sDollarsInFlight

    }
  };
};

export default covid19ImpactEstimator;
