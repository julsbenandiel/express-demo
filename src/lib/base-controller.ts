import * as express from "express"

class BaseController {
  public router: express.Router = express.Router();
}

export default BaseController