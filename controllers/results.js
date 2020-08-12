module.exports = {
  recordResults: async (req, res) => {
    const { player_id } = req.params
    const { map_id, win, heroes } = req.body
    try {
      const newResult = await req.db.player_results.insert({
        player_id,
        map_id,
        win,
      })

      const heroResults = heroes.map((hero) => ({
        ...hero,
        player_results_id: newResult.id,
      }))
      await req.db.player_results_heroes.insert(heroResults)
      res.status(200).send('Success')
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getResults: (req, res) => {
    const { player_id } = req.params

    console.log(player_id)
    res.sendStatus(200)
  },
}
