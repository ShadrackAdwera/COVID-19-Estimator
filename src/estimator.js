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
        case 'months': {
          const requestedTime = timeToElapse * 30;
          period = requestedTime / 3;
          break;
        }
        default:
          break;
      }
      const infectionsByRequestedTime = (currentlyInfected * 2 ** period).toFixed(0);
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
    }
  };
};

export default covid19ImpactEstimator;
