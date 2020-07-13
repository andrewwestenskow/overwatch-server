module.exports = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).send('Not logged in')
  } else {
    const { email } = req.params
    const [{ id: user_id }] = await req.db.users.find(
      { email },
      { fields: ['id'] }
    )
    if (user_id !== req.session.user.id) {
      return res.status(403).send('Incorrect login')
    }
    next()
  }
}
