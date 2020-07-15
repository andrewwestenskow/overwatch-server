const axios = require('axios')

module.exports = (players) => {
  return Promise.all(
    players.map(async (player) => {
      try {
        const details = await axios({
          url: `https://public-api.tracker.gg/v2/overwatch/standard/profile/${player.platform}/${player.name}`,
          method: 'GET',
          headers: { 'TRN-Api-Key': process.env.OW_API_KEY },
        })

        console.log(details.data)

        const { level, levelIcon, rating, ratingIcon, icon } = details.data

        return {
          ...player,
          level,
          levelIcon,
          rating,
          ratingIcon,
          icon,
          privateProfile: false,
        }
      } catch (error) {
        return { ...player, privateProfile: true }
      }
    })
  )
}
