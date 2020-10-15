import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Subject = db.subject;
const TClass = db.tclass;
import { errHandler } from '../utils/index'
import { OK } from 'http-status-codes';

const Workload = Express.Router();

const generateReport = async(req, res) => {
  try{

    //find all Teachers, insert teachers' IDs and teachers' name into respective new arrays
    const teachers = await Teacher.findAll({})
    const teachersIDArr = teachers.map(t => t.id)
    const teachersNameArr = teachers.map(t => t.name)

    // for each teacher in the array, find teacher's Subject and Class via teacher's id. Push found data into new array.
    let teachersData = []
    for(let i of teachersIDArr){
      let teacherSubClass = await Teacher.findAll({
        where: { id: i },
        include: [{
          model: Subject,
          as: 'subject',
          include: [{
            model: TClass,
            as: 'tclass',
            through: {where: {teacherId: i}},
          }]
        }],
      });
      teachersData.push(teacherSubClass)
    }

    let report = {}
    //loop through teachersData to retrieve each teacher's subject(s) and their associated class. create key-value properties for the subjects and number of classes into a single value assigned to teacher's name (key) in the report object.
    for(let h = 0; h < teachersData.length; h++){
      let subjectsTaken = []

      for(let i = 0; i < teachersData[h][0].subject.length; i++){
        let module ={}

        module['subjectCode'] = teachersData[h][0].subject[i].subjectCode
        module['subjectName'] = teachersData[h][0].subject[i].name
        module['numberOfClasses'] = teachersData[h][0].subject[i].tclass.length

        subjectsTaken.push(module)
      }
      report[teachersNameArr[h]] = subjectsTaken
    }

    return res.status(OK).json({
      status: OK,
      report
    })

  }catch(err){
    errHandler(err)
  }
}

Workload.get('/reports/workload', generateReport);
export default Workload;
