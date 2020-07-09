require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log('db set')
  app.listen(SERVER_PORT, () => console.log(`listening on port SERVER_PORT`))
})
