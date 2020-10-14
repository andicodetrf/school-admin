import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Student = db.student;
const Subject = db.subject;
const TClass = db.tclass;
const Teacher_Student = db.teacher_student;
const Teacher_Sub_Class = db.teacher_sub_class;
import {formatClassCode, formatSubjectCode, lowerCaseNameEmail, errHandler} from '../utils/index'

const Register = Express.Router();

const registerData = async (req, res) => {

  const teacherData = req.body.teacher;
  const studentsData = req.body.students; //array
  const subjectData = req.body.subject;
  const classData = req.body.class;


// ------- INPUT/REQ BODY VALIDATION --------
  switch(true) {
  case !teacherData.name:
    return res.status(400).json({message: `Error 400: Teacher's name input not found`})

  case !teacherData.email:
    return res.status(400).json({message: `Error 400: Teacher's email input not found`})

  case !studentsData: //for completely missing 'students:'
  case !studentsData.length: //for students = []
  case !Object.keys(studentsData).length: //for students = {}
    return res.status(400).json({message: `Error 400: Student's details not found`})

  case !subjectData.subjectCode:
    return res.status(400).json({message: `Error 400: Subject Code not found`})

  case !subjectData.name:
    return res.status(400).json({message: `Error 400: Subject Name not found`})

  case !classData.classCode:
    return res.status(400).json({message: `Error 400: Class Code not found`})

  case !classData.name:
    return res.status(400).json({message: `Error 400: Class Name not found`})

  }


  //Check if there is name' and 'email' in student object within students array
  for(let i of studentsData){
    if(!i.name){
      return res.status(400).json({message: `Error 400: Student's name not found`})
    }
    if(!i.email){
      return res.status(400).json({message: `Error 400: Student's email not found`})
    }
  }

// ------- DATA CLEANING --------

  lowerCaseNameEmail(teacherData);

  let studentsName = []
  let studentsEmail = []
  for(let i of studentsData){
    studentsName.push(i.name.toLowerCase());
    studentsEmail.push(i.email.toLowerCase());
  }

  formatSubjectCode(subjectData)
  formatClassCode(classData)

// ------- ACCESSING DB FOR DATA CREATION OR LOOKUP --------
  try{

    let insertTeacherData = await Teacher.findOrCreate({
      where:{
        email: teacherData.email,
        name: teacherData.name
      },
      // defaults: { name: teacherData.name }
      //finds the teacher by email (nonchangeable). if not found, create email and name data.
    })


    let teacherID = insertTeacherData[0].dataValues.id

    for(let i = 0; i < studentsEmail.length; i++){
      let insertStudentsData = await Student.findOrCreate({
        where:{
          email: studentsEmail[i],
          name: studentsName[i]
        }
      })

      let studentID = insertStudentsData[0].dataValues.id

      let insertTeacherStudents = await Teacher_Student.findOrCreate({
        where:{
          teacherId: teacherID,
          studentId: studentID
        }
      })

    }

    let insertSubjectData = await Subject.findOrCreate({
      where:{
        subjectCode: subjectData.subjectCode,
        name: subjectData.name
      }
    })

    let insertClassData = await TClass.findOrCreate({
      where:{
        classCode: classData.classCode,
        name: classData.name
      }
    })

    let subjectID = insertSubjectData[0].dataValues.id
    let classID = insertClassData[0].dataValues.id

    let insertTeacherSubClass = await Teacher_Sub_Class.findOrCreate({
      where:{
        teacherId: teacherID,
        subjectId: subjectID,
        tclassId: classID,
      }
    })


    if(!insertTeacherSubClass[0].isNewRecord){
      return res.status(200).json({message: 'Record has already been created'})
    }


    return res.status(201).json({message: 'Status 201: Created'})

  } catch(err){
    errHandler(err)
    return res.status(400).json({message: 'Error 400: Fields must be unique'})

  }

}


Register.post('/register', registerData);


export default Register;

