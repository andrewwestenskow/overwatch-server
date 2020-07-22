const derivePlatform = require('./derivePlatform')
const axios = require('axios')

const findRoleByKey = (arr, key) => arr.find((e) => e.role === key).level

module.exports = async (name, platformId) => {
  const platform = derivePlatform(platformId)
  try {
    const { data: details } = await axios.get(
      `https://ow-api.com/v1/stats/${platform}/us/${name}/profile`
    )

    if (details.private) {
      return {
        portrait: details.icon,
        tank_sr: null,
        damage_sr: null,
        support_sr: null,
        private: true,
      }
    } else {
      const { ratings } = details

      if (ratings) {
        return {
          portrait: details.icon,
          tank_sr: findRoleByKey(ratings, 'tank'),
          damage_sr: findRoleByKey(ratings, 'damage'),
          support_sr: findRoleByKey(ratings, 'support'),
          private: false,
        }
      } else {
        return {
          portrait: details.icon,
          tank_sr: null,
          damage_sr: null,
          support_sr: null,
          private: false,
        }
      }
    }
  } catch (error) {
    console.log(error)
    return {
      portrait: null,
      tank_sr: null,
      damage_sr: null,
      support_sr: null,
      private: true,
    }
  }
}
