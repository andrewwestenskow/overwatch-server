require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const app = express()
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const routes = require('./routes')

app.use((req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m', `\n${req.method} ${req.path}`)
  next()
})

app.use(cors())

app.use(express.json())

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
  })
)
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log('db set')
  app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})

app.use((req, res, next) => {
  const db = req.app.get('db')
  req.db = db
  next()
})

app.use('/api', routes)
