const chalk = require('chalk');
const moment = require('moment');

const dataIsCurrent = (lastTimeStamp) => {
  // In case last timestamp was issued more than 5 min ago, new data must be fetched from the HSL API.
  return moment().diff(lastTimeStamp, 'minutes') < 5; 
};

const printKeysOfArray = (arr, msg) => {
    let listOfKeys = [];
    Object.keys(arr).forEach(key => {
      listOfKeys.push(key);
    });
    listOfKeys.length < 1 && listOfKeys.push('0');
    console.log(chalk.blue(`${msg}${listOfKeys}`));
  }

module.exports = {
    dataIsCurrent,
    printKeysOfArray
}