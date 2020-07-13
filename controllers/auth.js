const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')
const getExpiryDate = require('../utils/getExpiryDate')

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body
    const db = req.app.get('db')

    const [existingUser] = await db.users.find({ email })

    if (existingUser) {
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(password, salt)
    const token = uuid()
    const token_expire = getExpiryDate(6)

    const newUser = await db.users.insert({ email, hash, token, token_expire })

    delete newUser.hash

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const { email, password } = req.body
    const db = req.app.get('db')

    const [existingUser] = await db.users.find({ email })

    if (!existingUser) {
      return res.status(404).send('User does not exist')
    }

    const authenticated = bcrypt.compareSync(password, existingUser.hash)

    if (!authenticated) {
      return res.status(403).send('Could not log in')
    }
    const token = uuid()
    const token_expire = getExpiryDate(6)

    const update = await req.db.users.save({
      id: existingUser.id,
      token,
      token_expire,
    })
    delete existingUser.hash
    req.session.user = existingUser

    res.status(200).send(req.session.user)
  },
  logout: async (req, res) => {
    const { id } = req.session.user
    await req.db.users.save({ id, token: null, token_expire: null })
    req.session.destroy()

    res.sendStatus(201)
  },
}
