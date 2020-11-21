module.exports = {
  getPlayerHistory: (req, res) => {},
  getPlayerHeroHistory: async (req, res) => {
    const { player_id, hero_id } = req.params

    const [best, worst] = await req.db.history.get_best_and_worst_hero_maps({
      player_id,
      hero_id,
    })

    res.status(200).send({ best, worst })
  },
}
