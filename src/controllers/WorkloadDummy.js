import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
// const Student = db.student;
const Subject = db.subject;
const TClass = db.tclass;
// const Teacher_Student = db.teacher_student;
// const Teacher_Sub_Class = db.teacher_sub_class;
import { errHandler } from '../utils/index'

const WorkloadDum = Express.Router();

const generateReportDum = async(req, res) => {

  // const teachers = await Teacher.findAll({})
  // const teachersIDArr = teachers.map(t => t.id)
  // const teachersNameArr = teachers.map(t => t.name)

  // let teachersData = []
  // for(let i of teachersIDArr){
  let teachersSubsClass = await Teacher.findAll({
    // where: { id: 2 },
    // include: [{
    //   model: TClass,
    //   as: 'tclass',
    //   // through: {where: {teacherId: i}},
    //   // where: {subjectCode: 'ENG'},
    //   // through:{where: {tclassId: 1}},
    //   include:[{
    //     model: Subject,
    //     as: 'subject',
    //     through:{where: {teacherId: 2}},
    //   }]
    // }]

  });
  //   teachersData.push(teachersSubsClass)
  // }

  // console.log('>>>>', JSON.stringify(teachersSubsClass,null,3))

  // let workload = {}

  // for(let h = 0; h < teachersData.length; h++){
  //   let sub = []

  //   for(let i = 0; i < teachersData[h][0].subject.length; i++){
  //     console.log(teachersData[h][0].subject[i].subjectCode)
  //     console.log(teachersData[h][0].subject[i].tclass.length)
  //     let o ={}
  //     o['subjectCode'] = teachersData[h][0].subject[i].subjectCode
  //     o['subjectName'] = teachersData[h][0].subject[i].name
  //     o['numberOfClasses'] = teachersData[h][0].subject[i].tclass.length

  //     sub.push(o)
  //   }
  //   workload[teachersNameArr[h]] = sub
  // }


  // console.log(workload)

  // return res.status(200).json(teachersSubsClass)

}

WorkloadDum.get('/reports/workload/dum', generateReportDum);


export default WorkloadDum;
