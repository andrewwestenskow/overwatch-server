const axios = require('axios')
const region = 'us'

module.exports = async (players) => {
  return await Promise.all(
    players.map(async (player) => {
      const { platform, name } = player
      const { data } = await axios.get(
        `http://owapi.io/profile/${platform}/us/${name}`
      )
      return { ...player, ...data }
    })
  )
}
