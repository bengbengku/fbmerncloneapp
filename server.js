const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { readdirSync } = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

//routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)))

app.get('/', (req, res) => {
  res.send('APP IS RUNNING..')
})

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Error connecting to database', err))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
