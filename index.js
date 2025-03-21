const express = require('express')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const app = express()
const PORT = 6000

app.use(express.json())

STORAGE_PATH = '/shail_PV_dir'

app.get('/', (req, res) => {
  res.send('Container - 1 is running successfully!')
})

app.post('/store-file', (req, res) => {
  const { file, data } = req.body

  if (!file) {
    return res.status(400).json({
      file: null,
      error: 'Invalid JSON input.',
    })
  }

  try {
    const filePath = path.join(STORAGE_PATH, file)

    fs.writeFileSync(filePath, data)

    return res.status(200).json({
      file: file,
      message: 'Success.',
    })
  } catch (err) {
    console.error('File Write Error:', err.message)

    return res.status(500).json({
      file: file,
      error: 'Error while storing the file to the storage.',
    })
  }
})

app.post('/calculate', async (req, res) => {
  const { file } = req.body

  console.log('Calculate api hit')

  if (!file) {
    return res.json({
      file: null,
      error: 'Invalid JSON input.',
    })
  }

  const filePath = path.join(STORAGE_PATH, file)

  if (!fs.existsSync(filePath)) {
    return res.json({
      file: file,
      error: 'File not found.',
    })
  }

  try {
    const response = await axios.post('http://container2-service/sum', req.body)
    return res.json(response.data)
  } catch (error) {
    return res.status(500).json(error.response.data)
  }
})

app.listen(PORT, () => {
  console.log(`Program1 running on port ${PORT}`)
})
