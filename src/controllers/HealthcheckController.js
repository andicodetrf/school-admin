import Express from 'express';
import { OK } from 'http-status-codes';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Student = db.student;
const Subject = db.subject;
const TClass = db.tclass;


const HealthcheckController = Express.Router();

const errHandler = (err) => {
  console.error('Error: ', err);
}

const healthcheckHandler = async (req, res) => {

  try{

    let foundTeachers = await Teacher.findAll()

    if(foundTeachers){
      console.log(foundTeachers)
      return res.status(200).json(foundTeachers)
    }
  } catch (err){
    errHandler(err)
  }
}


HealthcheckController.get('/healthcheck', healthcheckHandler);


export default HealthcheckController;
