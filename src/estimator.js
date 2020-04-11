
const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    region, periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
  // functions
  function dollarsLost(timeSelected) {
    let period = 0;
    switch (periodType.toLowerCase()) {
      case 'days': {
        period = timeSelected * 1;
        break;
      }
      case 'weeks': {
        period = timeSelected * 7;
        break;
      }
      case 'months': {
        period = timeSelected * 30;
        break;
      }
      default:
        break;
    }
    return period;
  }

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
    return Math.trunc(period);
  }

  // impact variables
  const impactInfected = reportedCases * 10;
  const impactInfctsByTime = Math.trunc((impactInfected * 2 ** normalizeTime(timeToElapse)));
  const impactSvreByRequestedTime = Math.trunc((0.15 * impactInfctsByTime));
  const impactBedsByTime = Math.trunc((totalHospitalBeds * 0.35) - impactSvreByRequestedTime);
  const impactCasesForICU = Math.trunc((impactInfctsByTime * 0.05));
  const impactCasesForVentilators = Math.trunc((impactInfctsByTime * 0.02));
  const losses = dollarsLost(timeToElapse) * region.avgDailyIncomeInUSD;
  const impDollarsInFlight = impactInfctsByTime * region.avgDailyIncomePopulation * losses;

  // severe impact variables
  const severeCurrentlyInfected = data.reportedCases * 50;
  const svInfections = Math.trunc((severeCurrentlyInfected * 2 ** normalizeTime(timeToElapse)));
  const svImpactSevereRequestedTime = Math.trunc(0.15 * svInfections);
  const severeImpactBeds = Math.trunc((totalHospitalBeds * 0.35) - svImpactSevereRequestedTime);
  const severeImpactCasesForICUByRequestedTime = Math.trunc((svInfections * 0.05));
  const severeImpactVentilators = Math.trunc((svInfections * 0.02));
  const svDollarsInFlight = svInfections * region.avgDailyIncomePopulation * losses;

  return {
    data: input,
    impact: {
      currentlyInfected: impactInfected,
      infectionsByRequestedTime: impactInfctsByTime,
      severeCasesByRequestedTime: impactSvreByRequestedTime,
      hospitalBedsByRequestedTime: impactBedsByTime,
      casesForICUByRequestedTime: impactCasesForICU,
      casesForVentilatorsByRequestedTime: impactCasesForVentilators,
      dollarsInFlight: impDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: svInfections,
      severeCasesByRequestedTime: svImpactSevereRequestedTime,
      hospitalBedsByRequestedTime: severeImpactBeds,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactVentilators,
      dollarsInFlight: svDollarsInFlight

    }
  };
};

export default covid19ImpactEstimator;
