import fs from 'fs';
import csv from 'csv-parser';

export const convertCsvToJson = (filePath) => {
  const results = [];
  const stream = fs.createReadStream(filePath).pipe(csv());

  return new Promise((resolve, reject) => {
    stream.on('data', (data) => results.push(data));
    stream.on('end', () => resolve(results));
    stream.on('error', (err) => reject(err));
  });
}

//error message log
export const errHandler = (err) => {
  console.error('ERROR ---> : ', err)
}

//validate alphanumeric including symbols such as . - ' for name input
export const validateStringField = (str) => {
  // const reg = /^(?![ .]+$)[a-zA-Z0-9\-' .]*$/
  const reg = /^[a-zA-Z][a-zA-Z0-9-' .]*$/ //improved ver after unit-testing to ensure name starts with alpha only
  return reg.test(str)
}

//validate email format for email input
export const validateEmailField = (eml) => {
  // const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const reg =/^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/ //improved ver after unit-testing to ensure email starts with alphanumeric, alphanumeric after '@' and alphanumeric after '.'
  return reg.test(eml)
}


//unique code & names for subject and classes
export const validateUniqueCodeName = (obj) => {
  const arr = Object.values(obj).map(item => item.toLowerCase())
  for(let i = 0; i < arr.length; i++){
    if(arr.indexOf(arr[i]) !== i){
      return false
    }
  }
  return true
}


//capitalize first character
export const capitalizeFirstChar = (item) => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
}


//lowercase name and email
export const lowerCaseNameEmail = (obj) => {
  for(let i in obj){
    obj[i] = obj[i].toLowerCase();
  }
  return obj
}

//capitalize and uppercase code for subject
export const formatSubjectCode = (sub) => {

  if(sub.name && sub.subjectCode){
    sub.name = capitalizeFirstChar(sub.name)
    sub.subjectCode = sub.subjectCode.toUpperCase()
  }

  if(sub.updateName && sub.updateSubjectCode){
    sub.updateName = capitalizeFirstChar(sub.updateName)
    sub.updateSubjectCode = sub.updateSubjectCode.toUpperCase()
  }
  return sub
}

//capitalize and uppercase code for class
export const formatClassCode = (cls) => {
  if(cls.name && cls.classCode){
    cls.name = capitalizeFirstChar(cls.name)
    cls.classCode = cls.classCode.toUpperCase()
  }

  if(cls.updateName && cls.updateClassCode){
    cls.updateName = capitalizeFirstChar(cls.updateName)
    cls.updateClassCode = cls.updateClassCode.toUpperCase()
  }
  return cls
}





