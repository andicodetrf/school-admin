import Express from 'express';
import { OK } from 'http-status-codes';
// const db = require('../config/db.config');
// const Teacher = db.teacher;
import { errHandler } from '../utils/index'


const HealthcheckController = Express.Router();

const healthcheckHandler = async (req, res) => {
  try{
    return res.status(OK).json({
      status: OK,
    })
  } catch (err){
    errHandler(err)
  }
}

HealthcheckController.get('/healthcheck', healthcheckHandler);


export default HealthcheckController;
