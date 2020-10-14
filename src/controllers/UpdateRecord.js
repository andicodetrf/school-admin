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

  const checkPersonForm = (obj) => {
    if(!obj.email || !obj.updateName || !obj.updateEmail ){
      return res.status(400).json({message: 'Error 400: Kindly complete the update with existing email(email: "jd@gmail.com"), new name(updateName: "John") and new email(updateEmail: "john@gmail.com") '})
    }
  }

  const checkSubjectForm = (obj) => {
    if(!obj.subjectCode || !obj.updateName || !obj.updateSubjectCode){
      return res.status(400).json({message: 'Error 400: Kindly complete the update with existing subject code (subjectCode: "ENG"), new subject name(updateName: "English2") and new subject code(updateSubjectCode: "ENG2").'})
    }
  }

  const checkClassForm = (obj) => {
    if(!obj.classCode || !obj.updateName || !obj.updateClassCode){
      return res.status(400).json({message: 'Error 400: Kindly complete the update with existing class code (classCode: "P1-I"), new class name(updateName: "P1-Unity") and new class code(updateSubjectCode: "P1-U").'})
    }
  }



  if(Object.keys(req.body).length !== 1){
    return res.status(400).json({message: 'Error 400: Kindly update only Teacher, Student, Subject or Class information at one time'})
  } else {
    if(req.body.teacher){
      checkPersonForm(req.body.teacher)
    }
    if(req.body.student){
      checkPersonForm(req.body.student)
    }
    if(req.body.subject){
      checkSubjectForm(req.body.subject)
    }
    if(req.body.class){
      checkClassForm(req.body.class)
    }
  }


  const updatePersonData = async (person, model) => {
    let updatePersonDetails = await model.update(
      { name: person.updateName,
        email: person.updateEmail },
      { where: {email: person.email}}
    )

    console.log('UP_PERSON_DETAILS', updatePersonDetails)

    if(updatePersonDetails[0]){
      console.log('TESTTT')
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
      return res.status(200).json({message: '200: Subject Details updated'})
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
      return res.status(200).json({message: '200: Class Details updated'})
    } else {
      return res.status(400).json({message: 'Error 400: Class Code Not Found. Kindly register'})
    }
  }


  try{


    if(editTeacher){
      lowerCaseNameEmail(editTeacher)
      updatePersonData(editTeacher, Teacher)
    }

    if(editStudent){
      lowerCaseNameEmail(editStudent)
      updatePersonData(editStudent, Student)
    }

    if(editSubject){
      formatSubjectCode(editSubject)
      updateSubjectData(editSubject)
    }


    if(editClass){
      formatClassCode(editClass)
      updateClassData(editClass)
    }


  } catch(err) {
    errHandler(err)
  }

}


UpdateRecord.post('/register/update', updateData);


export default UpdateRecord;

