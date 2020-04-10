/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact() {
      infectedImpact();
      infectionsByRequestedTimeImpact();
    },
    severeImpact() {
      infectedSevereImpact();
      infectionsByRequestedTimeSevereImpact();
    }
  };
};

function infectedImpact() {
  return data.reportedCases * 10;
}
function infectedSevereImpact() {
  return data.reportedCases * 50;
}
function infectionsByRequestedTimeImpact() {
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
  return parseInt((infectedImpact() * 2 ** period).toFixed(0), 10);
}
function infectionsByRequestedTimeSevereImpact() {
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
  return parseInt((infectedSevereImpact() * 2 ** period).toFixed(0), 10);
}

export default covid19ImpactEstimator;
