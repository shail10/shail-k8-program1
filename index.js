const express = require('express')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const app = express()
const PORT = 6000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Container 1 running')
})

app.listen(PORT, () => {
  console.log(`Program1 running on por${PORT}`)
})
