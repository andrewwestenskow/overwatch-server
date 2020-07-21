const applyDetailsToPlayers = require('../utils/applyDetailsToPlayer')

module.exports = {
  createPlayer: async (req, res) => {
    const { id: user_id } = req.session.user
    const { name, platform_id } = req.body
    try {
      const player = await req.db.players.insert({ name, user_id, platform_id })
      req.session.user.player = player
      res.status(200).send(player)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getAllPlayers: async (req, res) => {
    const { id: user_id } = req.session.user
    try {
      const players = await req.db.get_user_players({ user_id })
      const playerDetails = await applyDetailsToPlayers(players)
      res.status(200).send(playerDetails)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  getPlayerById: async (req, res) => {
    const { playerId: id } = req.params
    try {
      const player = await req.db.players.find({ id })
      req.session.user.player = player
      res.status(200).send(player)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  deletePlayer: async (req, res) => {
    const { playerId: id } = req.params
    const { id: user_id } = req.session.user

    try {
      const player = await req.db.players.find({ id })
      if (user_id !== player.user_id) {
        return res.status(403).send('Unable to delete player')
      }

      await req.db.players.destroy({ id })
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
