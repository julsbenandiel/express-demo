require('dotenv')
import * as express from 'express'
import DBConnector from "./lib/database"
import Config from "./lib/config"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const connectDatabase = async () => {
  const connectionString: string = `${Config.MONGO_URL}/${Config.FASHION_CLOUD_DB}`
  await DBConnector.connectMongo(connectionString);
};

async function start() {
  const port: number = Config.SERVICE_PORT;

  await connectDatabase()
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

start()