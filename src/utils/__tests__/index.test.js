import {validateStringField, validateEmailField, validateUniqueCodeName, capitalizeFirstChar, lowerCaseNameEmail, formatSubjectCode } from '../index'


// ------ TEST VALIDATE NAME STRING FORMAT FUNCTION
describe(`name property value should allow only alphanumeric or -.' symbols and whitespace`, () => {
  
  test(`evaluates to true if str contains only alphanumeric`,() =>{
    expect(validateStringField(`George`)).toBeTruthy()
  })

  test(`evaluates to true if str contains only alphanumeric -.' whitespace`,() =>{
    expect(validateStringField(`Mr. Tan-Loh D'Angelo`)).toBeTruthy()
  })

  test(`evaluates to false if str starts with -.' whitespace`,() =>{
    expect(validateStringField(`-Andrea`)).toBeFalsy()
    expect(validateStringField(`.Andi`)).toBeFalsy()
    expect(validateStringField(`'Andi`)).toBeFalsy()
    expect(validateStringField(` `)).toBeFalsy()
  })

  test(`evaluates to false if str contains other characters that are NOT alphanumeric -.' whitespace`,() =>{
    expect(validateStringField(`george@gmail.com`)).toBeFalsy()
    expect(validateStringField(`george!`)).toBeFalsy()
    expect(validateStringField(`george&mary`)).toBeFalsy()
  })

})

// ------ TEST VALIDATE EMAIL FORMAT FUNCTION
describe(`email property value should have '@' and '.' between the string with 2-4 chars for top level domain`, () => {
  
  test(`evaluates to true if input contains @ and . in between the string with 2-4 chars TLD`,() =>{
    expect(validateEmailField(`george@gmail.com`)).toBeTruthy()
  })

  test(`evaluates to false if input does not contain @`,() =>{
    expect(validateEmailField(`george.com`)).toBeFalsy()
  })

  test(`evaluates to false if input does not contain .`,() =>{
    expect(validateEmailField(`george@gmail`)).toBeFalsy()
  })

  test(`evaluates to false if input begins with non-alphanumeric`,() =>{
    expect(validateEmailField(`-george@gmail.com`)).toBeFalsy()
    expect(validateEmailField(`!george@gmail.com`)).toBeFalsy()
    
  })

  test(`evaluates to false if input contains other characters aside @-.`,() =>{
    expect(validateEmailField(`geor$ge@gmail.com`)).toBeFalsy()
  })

  test(`evaluates to true if input contains alphanumeric after '@'`,() =>{
    expect(validateEmailField(`george@abc.com`)).toBeTruthy()
    expect(validateEmailField(`george@123.com`)).toBeTruthy()
  })

  test(`evaluates to true if input contains alphanumeric for TLD after '.' with max 2-4 chars`,() =>{
    expect(validateEmailField(`george@abc.abc`)).toBeTruthy()
    expect(validateEmailField(`george@abc.123`)).toBeTruthy()
    expect(validateEmailField(`george@abc.abcde`)).toBeFalsy()
    expect(validateEmailField(`george@abc.a`)).toBeFalsy() 
  })

})

// ------ TEST VALIDATE UNIQUENESS OF OBJECT NAME AND CODE FUNCTION
describe('code and name for subject and class should be unique', () => {
  test('evaluates to true if object code and object name are different', () => {
    const subject = {
      name: 'ENG',
      subjectCode: 'English'
    }

    const tclass = {
      name: 'P1-I',
      classCode: 'P1-Integrity'
    }

    expect(validateUniqueCodeName(subject)).toBeTruthy()
    expect(validateUniqueCodeName(tclass)).toBeTruthy()
  })
})

// ------ TEST LOWERCASE FUNCTION FOR OBJECT
describe(`person object's name and email input should be lowercased`, () => {
  test('return lowercase of name' , () => {
    const person = {
      name: 'Mr. JOHnnY',
      email: 'JOHN@Gmail.COM'
    }
    expect(lowerCaseNameEmail(person)).toEqual({name: 'mr. johnny', email: 'john@gmail.com'})
  })

})


// ------ TEST CAPITALIZE FUNCTION
describe('first char of string should be capitalized', () => {
  test('returns capitalized first char of string input' , () => {
    expect(capitalizeFirstChar('english')).toBe('English')
  })

  test('no modification if first char is a number' , () => {
    expect(capitalizeFirstChar('1-integrity')).toBe('1-integrity')
  })
})

// ------ TEST FORMAT SUBJECT OBJECT FUNCTION
describe('subject object should have capitalized name and uppercased code', () => {
  test('returns capitalized name and uppercased code' , () => {
    const subject = {
      name: 'english',
      subjectCode: 'eng'
    }

    const updateSubject = {
      updateName: 'english2',
      updateSubjectCode: 'engii'
    }

    expect(formatSubjectCode(subject)).toEqual({
      name: 'English',
      subjectCode: 'ENG'
    })

    expect(formatSubjectCode(updateSubject)).toEqual({
      updateName: 'English2',
      updateSubjectCode: 'ENGII'
    })
  })
})




