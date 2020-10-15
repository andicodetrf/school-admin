import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Student = db.student;
const Subject = db.subject;
const TClass = db.tclass;
const Teacher_Student = db.teacher_student;
const Teacher_Sub_Class = db.teacher_sub_class;
const Student_Class = db.student_class;
import {formatClassCode, formatSubjectCode, lowerCaseNameEmail, errHandler, validateEmailField, validateStringField, validateUniqueCodeName} from '../utils/index'
import { BAD_REQUEST, OK, NO_CONTENT } from 'http-status-codes';

const Register = Express.Router();

const registerData = async (req, res) => {

  const {
    teacher: teacherData,
    students: studentsData,
    subject:subjectData,
    class: classData
  } = req.body

  // ------- INPUT/REQ BODY VALIDATION --------
  switch(true) {
  case !teacherData.name:
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Teacher's name input not found`
    })

  case !teacherData.email:
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Teacher's email input not found`
    })

  case !studentsData: //for completely missing 'students:'
  case !studentsData.length: //for students = []
  case !Object.keys(studentsData).length: //for students = {}
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Require at least one student (name and email) for registration`
    })

  case !subjectData.subjectCode:
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Subject Code input not found`
    })

  case !subjectData.name:
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Subject Name input not found`
    })

  case !classData.classCode:
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Class Code input not found`
    })

  case !classData.name:
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Error 400: Class Name not found`
    })

  }

  //Validate name and email field (Teacher)
  if(!validateStringField(teacherData.name)){
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Teacher's name must be alphabet only`
    })
  }

  if(!validateEmailField(teacherData.email)){
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Teacher's email must be in email format`
    })
  }

  //Check if there is 'name' and 'email' in student. Validate name and email format
  for(let i of studentsData){
    if(!i.name){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: `Student's name input not found`
      })

    }
    if(!i.email){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: `Student's email input not found`
      })
    }
    if(!validateStringField(i.name)){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: `Student's name must be alphabet only`
      })
    }
    if(!validateEmailField(i.email)){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: `Student's email must be in email format`
      })
    }
  }

  //validate subject/class code to be unique from subject/class name
  if(!validateUniqueCodeName(subjectData)){
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Subject Name and Subject Code cannot be the same`
    })
  }

  if(!validateUniqueCodeName(classData)){
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: `Class Name and Class Code cannot be the same`
    })
  }


  // ------- DATA CLEANING --------

  //lowercase names and emails for teacher & students
  lowerCaseNameEmail(teacherData);

  let studentsName = []
  let studentsEmail = []
  for(let i of studentsData){
    studentsName.push(i.name.toLowerCase());
    studentsEmail.push(i.email.toLowerCase());
  }

  //capitalize subject and class names, uppercase subject & class codes
  formatSubjectCode(subjectData)
  formatClassCode(classData)

  // ------- ACCESSING DB FOR DATA CREATION OR LOOKUP --------
  try{

    const insertTeacherData = await Teacher.findOrCreate({
      where:{
        email: teacherData.email,
      },
      defaults: { name: teacherData.name }
      //finds the teacher by email (nonchangeable). if not found, create email and name from defaults data.
    })


    const teacherID = insertTeacherData[0].dataValues.id

    //create relationship between Teachers and Students
    for(let i = 0; i < studentsEmail.length; i++){
      const insertStudentsData = await Student.findOrCreate({
        where:{
          email: studentsEmail[i],
        },
        defaults: { name: studentsName[i] }
      })

      const studentID = insertStudentsData[0].dataValues.id

      const insertTeacherStudents = await Teacher_Student.findOrCreate({
        where:{
          teacherId: teacherID,
          studentId: studentID
        }
      })

    }

    const insertSubjectData = await Subject.findOrCreate({
      where:{
        subjectCode: subjectData.subjectCode,
      },
      defaults: { name: subjectData.name }
    })


    const insertClassData = await TClass.findOrCreate({
      where:{
        classCode: classData.classCode,
      },
      defaults: { name: classData.name }
    })

    const subjectID = insertSubjectData[0].dataValues.id
    const classID = insertClassData[0].dataValues.id

    //create relationship between Teachers, Subjects and Classes
    const insertTeacherSubClass = await Teacher_Sub_Class.findOrCreate({
      where:{
        teacherId: teacherID,
        subjectId: subjectID,
        tclassId: classID,
      }
    })

    //create relationship between Students and Classes
    for(let i = 0; i < studentsEmail.length; i++){
      const findStudent = await Student.findAll({
        where:{ email: studentsEmail[i] }
      })

      const studentID = findStudent[0].dataValues.id
      const insertStudentClass = await Student_Class.findOrCreate({
        where:{
          studentId: studentID,
          tclassId: classID
        }
      })

    }


    //Informs user that the record already exist in DB
    if(!insertTeacherSubClass[0]._options.isNewRecord){
      return res.status(OK).json({
        status: OK,
        message: 'Record is already in the system'
      })
    }

    //Status No Content (204) if successfully created/registered
    return res.sendStatus(NO_CONTENT)

  } catch(err) {
    errHandler(err)

  }

}


Register.post('/register', registerData);


export default Register;

