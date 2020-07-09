const bcrypt = require('bcryptjs')

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

    const newUser = await db.users.save({ email, hash })

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

    delete existingUser.hash
    req.session.user = existingUser

    res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
    req.session.destroy()

    res.sendStatus(201)
  },
}
