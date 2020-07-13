const moment = require('moment')

module.exports = (intervalInMonths = 6) => {
  return moment().add(intervalInMonths, 'M').format('YYYY-MM-DD[T]HH:mm:ss')
}
