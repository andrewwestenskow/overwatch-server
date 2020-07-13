module.exports = {
  getAllHeroes: async (req, res) => {
    const { role } = req.query
    try {
      if (role) {
        const heroes = await req.db.get_all_heroes_by_role_id({
          role,
        })
        res.status(200).send(heroes)
      } else {
        const heroes = await req.db.get_all_heroes()
        res.status(200).send(heroes)
      }
    } catch (error) {
      console.log(error)
      res.status(500).send('Could not get heroes')
    }
  },
}
