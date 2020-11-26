const convertResults = (arr, limit = 5) =>
  arr
    .filter((e) => e.games_played >= limit)
    .map((e) => {
      const winRate = ((e.win_count / e.games_played) * 100).toFixed(2)
      return {
        ...e,
        win_rate: winRate !== 'NaN' ? winRate : 0,
      }
    })
    .sort((a, b) => b.win_rate - a.win_rate)

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
  getResults: async (req, res) => {
    const { player_id } = req.params
    const heroResults = await req.db.results.get_all_hero_win_rate(player_id)
    const applicableHeros = convertResults(heroResults)
    const mapResults = await req.db.results.get_all_map_win_rate(player_id)
    const applicableMaps = convertResults(mapResults, 1)
    res
      .status(200)
      .send({ heroResults: applicableHeros, mapResults: applicableMaps })
  },
  getAllHeroResults: async (req, res) => {
    const { player_id } = req.params
    const heroResults = await req.db.results.get_all_hero_stats(player_id)
    const applicableResults = convertResults(heroResults, 0)
    res.status(200).send(applicableResults)
  },
  getAllMapResults: async (req, res) => {
    const { player_id } = req.params
    const mapResults = await req.db.results.get_all_map_stats(player_id)
    const applicableResults = convertResults(mapResults, 0)
    res.status(200).send(applicableResults)
  },
}
