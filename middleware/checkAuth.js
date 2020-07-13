module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).send('Not logged in')
  }
  next()
}
