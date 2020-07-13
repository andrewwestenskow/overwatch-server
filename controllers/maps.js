module.exports = {
  getAllMaps: async (req, res) => {
    try {
      const maps = await req.db.get_all_maps()
      res.status(200).send(maps)
    } catch (error) {
      console.log(error)
      res.status(500).send('Could not get all maps')
    }
  },
}
