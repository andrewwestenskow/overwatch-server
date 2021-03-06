const axios = require('axios')
const region = 'us'

module.exports = async (players) => {
  return await Promise.all(
    players.map(async (player) => {
      const { platform, name } = player
      try {
        const { data } = await axios.get(
          `https://ow-api.com/v1/stats/${platform}/us/${name}/profile`
        )
        if (data.private) {
          return { ...player, private: true }
        } else {
          return { ...player, ...data }
        }
      } catch (error) {
        return { ...player, private: true }
      }
    })
  )
}
