import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Student = db.student;
const Subject = db.subject;
const TClass = db.tclass;
import {lowerCaseNameEmail, formatSubjectCode, formatClassCode, errHandler} from '../utils/index'

const UpdateRecord = Express.Router();

const updateData = async (req, res) => {

  const editTeacher = req.body.teacher;
  const editStudent = req.body.student;
  const editSubject = req.body.subject;
  const editClass = req.body.class;

  //---- VALIDATE REQUEST BODY STRUCTURE
  if(Object.keys(req.body).length !== 1){
    return res.status(400).json({message: 'Error 400: Kindly update only Teacher, Student, Subject or Class information at one time'})
  }

  //---- VALIDATE REQUEST BODY INPUT FUNCTIONS
  const checkPersonForm = (person) => {
    if(!person.email || !person.updateName || !person.updateEmail ){
      return res.status(400).json({message: `Error 400: Kindly complete the update with existing email(email: 'jd@gmail.com'), new name(updateName: 'John') and new email(updateEmail: 'john@gmail.com') `})
    }

    if(person.updateName === person.updateEmail){
      return res.status(400).json({message: `Email and Name to be updated must be unique from one another`})
    }
    return 'toUpdate'
  }

  const checkSubjectForm = (sub) => {
    if(!sub.subjectCode || !sub.updateName || !sub.updateSubjectCode){
      return res.status(400).json({message: 'Error 400: Kindly complete the update with existing subject code (subjectCode: "ENG"), new subject name(updateName: "English2") and new subject code(updateSubjectCode: "ENG2").'})
    }

    if(sub.updateName === sub.updateSubjectCode){
      return res.status(400).json({message: 'Name and Code to be updated must be unique from one another'})
    }
    return 'toUpdate'
  }

  const checkClassForm = (cls) => {
    if(!cls.classCode || !cls.updateName || !cls.updateClassCode){
      return res.status(400).json({message: 'Error 400: Kindly complete the update with existing class code (classCode: "P1-I"), new class name(updateName: "P1-Unity") and new class code(updateSubjectCode: "P1-U").'})
    }

    if(cls.updateName === cls.updateClassCode){
      return res.status(400).json({message: 'Name and Code to be updated must be unique from one another'})
    }
    return 'toUpdate'
  }

//---- UPDATE DATA FUNCTIONS
  const updatePersonData = async (person, model) => {
    let updatePersonDetails = await model.update(
      { name: person.updateName,
        email: person.updateEmail },
      { where: {email: person.email}}
    )

    console.log('UP_PERSON_DETAILS', updatePersonDetails)

    if(updatePersonDetails[0]){
      return res.status(200).json({message: '200: Person details updated'})
    } else {
      return res.status(400).json({message: 'Error 400: Email not found. Kindly register'})
    }
  }

  const updateSubjectData = async (sub) => {
    let updateSubjectDetails = await Subject.update(
      { name: sub.updateName,
        subjectCode: sub.updateSubjectCode },
      { where: {subjectCode: sub.subjectCode}}
    )

    console.log('UP_SUB_DETAILS', updateSubjectDetails)

    if(updateSubjectDetails[0]){
      return res.status(200).json({message: '200: Subject details updated'})
    } else {
      return res.status(400).json({message: 'Error 400: Subject Code Not Found. Kindly register'})
    }
  }

  const updateClassData = async (cls) => {
    let updateClassDetails = await TClass.update(
      { name: cls.updateName,
        classCode: cls.updateClassCode },
      { where: {classCode: cls.classCode}}
    )

    console.log('UP_CLASS_DETAILS', updateClassDetails)

    if(updateClassDetails[0]){
      return res.status(200).json({message: '200: Class details updated'})
    } else {
      return res.status(400).json({message: 'Error 400: Class Code Not Found. Kindly register'})
    }
  }


  try{
    if(editTeacher && checkPersonForm(editTeacher) === 'toUpdate'){
      lowerCaseNameEmail(editTeacher)
      updatePersonData(editTeacher, Teacher)
    }

    if(editStudent && checkPersonForm(editStudent) === 'toUpdate'){
      lowerCaseNameEmail(editStudent)
      updatePersonData(editStudent, Student)
    }

    if(editSubject && checkSubjectForm(editSubject) === 'toUpdate'){
      formatSubjectCode(editSubject)
      updateSubjectData(editSubject)
    }

    if(editClass && checkClassForm(editClass) === 'toUpdate'){
      formatClassCode(editClass)
      updateClassData(editClass)
    }


  } catch(err) {
    errHandler(err)
  }

}


UpdateRecord.post('/register/update', updateData);


export default UpdateRecord;

