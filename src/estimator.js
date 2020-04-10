/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact() {
      const currentlyInfected = data.reportedCases * 10;
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
      const infectionsByRequestedTime = (currentlyInfected * 2 ** period).toFixed(0);
    },
    severeImpact() {
      const currentlyInfected = data.reportedCases * 50;
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
      const infectionsByRequestedTime = (currentlyInfected * 2 ** period).toFixed(0);
    }
  };
};

export default covid19ImpactEstimator;
