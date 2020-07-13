const moment = require('moment')

module.exports = (intervalInMonths = 6) => {
  return moment().add(intervalInMonths, 'M')
}
