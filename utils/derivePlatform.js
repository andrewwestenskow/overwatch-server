const { PC, XBL, PSN, SWITCH } = require('../constants/PLATFORMS')

module.exports = (platformId) => {
  switch (platformId) {
    case PC.id:
      return PC.name
    case XBL.id:
      return XBL.name
    case PSN.id:
      return PSN.name
    case SWITCH.id:
      return SWITCH.name
    default:
      return null
  }
}
