const moment = require('moment')

module.exports = async (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    const token = req.get('Authorization')

    const [user] = await req.db.users.find({ token })
    if (!user) {
      console.log('Bad Token: ', token)
      return res.status(401).send('Incorrect Authorization header')
    }
    const now = moment()
    const expire = moment(user.token_expire)
    if (now.isAfter(expire)) {
      console.log('IS AFTER')
      await req.db.users.save({ id: user.id, token: null, token_expire: null })
      return res.status(403).send('Unauthorized')
    } else {
      delete user.hash
      req.session.user = user
      next()
    }
  }
}
