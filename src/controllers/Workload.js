import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Subject = db.subject;
const TClass = db.tclass;
import { errHandler } from '../utils/index'

const Workload = Express.Router();

const generateReport = async(req, res) => {
  try{

    const teachers = await Teacher.findAll({})
    const teachersIDArr = teachers.map(t => t.id)
    const teachersNameArr = teachers.map(t => t.name)

    let teachersData = []
    for(let i of teachersIDArr){
      let teachersSubsClass = await Teacher.findAll({
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
      teachersData.push(teachersSubsClass)
    }

    let report = {}

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

    return res.status(200).json(report)

  }catch(err){
    errHandler(err)
  }
}

Workload.get('/reports/workload', generateReport);
export default Workload;
// export default generateReport;
