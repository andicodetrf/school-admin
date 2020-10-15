import Express from 'express';
const db = require('../config/db.config');
const Teacher = db.teacher;
const Student = db.student;
const Subject = db.subject;
const TClass = db.tclass;
import {lowerCaseNameEmail, formatSubjectCode, formatClassCode, errHandler, validateEmailField, validateStringField } from '../utils/index'
import { BAD_REQUEST, OK, NOT_FOUND } from 'http-status-codes';

const UpdateRecord = Express.Router();

const updateData = async (req, res) => {

  const {
    teacher: editTeacher,
    student: editStudent,
    subject: editSubject,
    class: editClass
  } = req.body


  //---- VALIDATE REQUEST BODY STRUCTURE
  if(Object.keys(req.body).length !== 1){
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: 'Kindly update only Teacher, Student, Subject or Class information at one time'})
  }

  //---- VALIDATE FUNCTIONS FOR REQUEST BODY INPUT
  const checkPersonForm = (person) => {
    if(!person.email || !person.updateName || !person.updateEmail ){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: `Kindly complete the update with existing email(email: 'jd@gmail.com'), new name(updateName: 'John') and new email(updateEmail: 'john@gmail.com') `
      })
    }

    if(!validateStringField(person.updateName)){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'Name must be alphabet only'
      })
    }

    if(!validateEmailField(person.email) || !validateEmailField(person.updateEmail)){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'Email must be in email format'
      })
    }

    return 'toUpdate'
  }

  const checkSubjectForm = (sub) => {
    if(!sub.subjectCode || !sub.updateName || !sub.updateSubjectCode){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'Kindly complete the update with existing subject code (subjectCode: "ENG"), new subject name(updateName: "English2") and new subject code(updateSubjectCode: "ENG2").'
      })
    }

    if(sub.updateName === sub.updateSubjectCode){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'Name and Code due for update must be unique from one another'
      })
    }
    return 'toUpdate'
  }

  const checkClassForm = (cls) => {
    if(!cls.classCode || !cls.updateName || !cls.updateClassCode){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'Kindly complete the update with existing class code (classCode: "P1-I"), new class name(updateName: "P1-Unity") and new class code(updateSubjectCode: "P1-U").'
      })
    }

    if(cls.updateName === cls.updateClassCode){
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: 'Name and Code due for update must be unique from one another'
      })
    }
    return 'toUpdate'
  }

//---- FUNCTIONS FOR CATEGORICAL UPDATE (PERSON, SUBJECT, CLASS)
  const updatePersonData = async (person, model) => {
    const updatePersonDetails = await model.update(
      { name: person.updateName,
        email: person.updateEmail },
      { where: {email: person.email}}
    )

    // console.log('UP_PERSON_DETAILS', updatePersonDetails)

    if(updatePersonDetails[0]){
      return res.status(OK).json({
        status: OK,
        message: 'Person details updated'
      })
    } else {
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: 'Email not found. Kindly register'
      })
    }
  }

  const updateSubjectData = async (sub) => {
    const updateSubjectDetails = await Subject.update(
      { name: sub.updateName,
        subjectCode: sub.updateSubjectCode },
      { where: {subjectCode: sub.subjectCode}}
    )

    // console.log('UP_SUB_DETAILS', updateSubjectDetails)

    if(updateSubjectDetails[0]){
      return res.status(OK).json({
        status: OK,
        message: 'Subject details updated'
      })
    } else {
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: 'Subject Code Not Found. Kindly register'
      })
    }
  }

  const updateClassData = async (cls) => {
    const updateClassDetails = await TClass.update(
      { name: cls.updateName,
        classCode: cls.updateClassCode },
      { where: {classCode: cls.classCode}}
    )

    // console.log('UP_CLASS_DETAILS', updateClassDetails)

    if(updateClassDetails[0]){
      return res.status(OK).json({
        status: OK,
        message: 'Class details updated'
      })
    } else {
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: 'Class Code Not Found. Kindly register'
      })
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

