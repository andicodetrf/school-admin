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

//errHandler
export const errHandler = (err) => {
  console.error('ERROR ---> : ', err);
}


//capitalize
export const capitalizeFirstChar = (item) => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
}


//lowercase object data
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



