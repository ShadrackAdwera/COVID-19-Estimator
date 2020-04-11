
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
    return Math.floor(period);
  }

  // impact variables
  const normalizedPeriod = normalizeTime(timeToElapse);
  const impactInfected = reportedCases * 10;
  const impactInfctsByTime = Math.floor((impactInfected * 2 ** normalizedPeriod));
  const impactSvreByRequestedTime = Math.floor((0.15 * impactInfctsByTime));
  const impactBedsByTime = Math.floor((totalHospitalBeds * 0.35) - impactSvreByRequestedTime);
  const impactCasesForICU = Math.floor((impactInfctsByTime * 0.05));
  const impactCasesForVentilators = Math.floor((impactInfctsByTime * 0.02));
  const impactDollarsInFlight = impactInfctsByTime * region.avgDailyIncomeInUSD * normalizedPeriod;


  // severe impact variables
  const severeCurrentlyInfected = data.reportedCases * 50;
  const svInfections = Math.floor((severeCurrentlyInfected * 2 ** normalizedPeriod));
  const svImpactSevereRequestedTime = Math.floor(0.15 * svInfections);
  const severeImpactBeds = Math.floor((totalHospitalBeds * 0.35) - svImpactSevereRequestedTime);
  const severeImpactCasesForICUByRequestedTime = Math.floor((svInfections * 0.05));
  const severeImpactVentilators = Math.floor((svInfections * 0.02));
  const sDollarsInFlight = svInfections * region.avgDailyIncomeInUSD * normalizedPeriod;

  return {
    data: input,
    impact: {
      currentlyInfected: impactInfected,
      infectionsByRequestedTime: impactInfctsByTime,
      severeCasesByRequestedTime: impactSvreByRequestedTime,
      hospitalBedsByRequestedTime: impactBedsByTime,
      casesForICUByRequestedTime: impactCasesForICU,
      casesForVentilatorsByRequestedTime: impactCasesForVentilators,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: svInfections,
      severeCasesByRequestedTime: svImpactSevereRequestedTime,
      hospitalBedsByRequestedTime: severeImpactBeds,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactVentilators,
      dollarsInFlight: sDollarsInFlight

    }
  };
};

export default covid19ImpactEstimator;
