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


// const healthCheckAdd = async (req, res) => {
//   try{
    // //CREATE DATA
    // const addTeacher = {
    //   name: 'TeacherOne',
    //   email: 'T_ONEgmail.com'
    // }
    // // const addStudentOne = {
    // //   name: 'StudentOne',
    // //   email: 'St_One@gmail.com'
    // // }

    // // const addStudentTwo = {
    // //   name: 'StudentTwo',
    // //   email: 'St_Two@gmail.com'
    // // }


    // let { name, email } = addTeacher;


    // //INSERT INTO TABLE. gonna return a promise
    // await Teacher.create({
    //   name,
    //   email
    // })

    // await Student.bulkCreate([addStudentOne, addStudentTwo ])

    // await Subject.create({
    //   subjectName: 'English',
    //   subjectCode: 'ENG'
    // })

    // await TClass.create({
    //   className: 'P1-Integrity',
    //   classCode: 'P1-I'
    // })

    // res.redirect('/api/healthcheck')


//   } catch(err){
//     errHandler(err)
//     res.sendStatus(400)
//   }
// }


HealthcheckController.get('/healthcheck', healthcheckHandler);
// HealthcheckController.get('/healthcheck/add', healthCheckAdd);

export default HealthcheckController;
