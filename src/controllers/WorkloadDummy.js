import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Subject = db.subject;
const TClass = db.tclass;
import { errHandler } from '../utils/index'

const WorkloadDum = Express.Router();

//FOR TESTING. TO DELETE
const generateReportDum = async(req, res) => {

  let teachersSubsClass = await Teacher.findAll({
    // where: { id: 2 },
    include: [{
      model: Subject,
      as: 'subject',
      // model: TClass,
      // as: 'tclass',
      // through: {where: {teacherId: i}},
      // where: {subjectCode: 'ENG'},
      // through:{where: {tclassId: 1}},
      include:[{
      model: TClass,
      as: 'tclass'
        // model: Subject,
        // as: 'subject',
      //   through:{where: {teacherId: 2}},
      }]
    }]

  });

  console.log('>>>>', JSON.stringify(teachersSubsClass,null,3))

}

WorkloadDum.get('/reports/workload/dum', generateReportDum);


export default WorkloadDum;
