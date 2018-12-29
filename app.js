const express = require('express')
const app = express()
const fields = require('./data/fields.json')
const port = process.env.PORT || 2107

app.use('/assets', express.static(`${__dirname}/public/assets`))

app.get('/api/fields', (req, res) => {
  res.json(fields)
})

app.get('/form', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

const server = app.listen(port, () => {
  let host = server.address().address
  let port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})
