module.exports = {
  getAllPlatforms: (req, res) => {
    req.db.platforms.find().then((data) => res.status(200).send(data))
  },
}
