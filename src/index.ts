loadEnv()
import * as express from 'express'
import * as cors from 'cors'
import DBConnector from "./lib/database"
import Config from "./lib/config"
import API from './api'

import globalErrorMiddleware from './middleware/global-error'
import notFoundMiddleware from './middleware/not-found'

const app = express()

app.use(cors({}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", API)

app.use(notFoundMiddleware)
app.use(globalErrorMiddleware)

async function connectDatabase() {
  const connectionString: string = `${Config.MONGO_URL}/${Config.FASHION_CLOUD_DB}`
  await DBConnector.connectMongo(connectionString);
};

function loadEnv() {
  const path = require("node:path")
  const env = path.join(__dirname, "../.env.development")
  return require('dotenv').config({ path: env })
}

async function start() {
  const port: number = Config.SERVICE_PORT;

  await connectDatabase()
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

start()