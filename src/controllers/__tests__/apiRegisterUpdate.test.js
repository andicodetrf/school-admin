import app from '../../app'; 
import supertest from 'supertest';
const request = supertest(app);
const db = require('../../config/db.config');
import Sequelize from 'sequelize'
const Op = Sequelize.Op;

//to test db-related routes, ensure the docker container is running 

//clear DB data after all tests (including seed data in workload.test.js)
const models = db.sequelize.models
const cleanDB = async (models) => {
  for(let model in models) {
    await models[model].destroy({
      where: {
        id:{
          [Op.ne]: null, 
        }
      }
    })
  }
}

describe(`POST 'api/register/' route tests with varied request body input`, () => {
  test("should return Status Code 204 if request body is successfully registered", async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 1",
        email: "teacherone@gmail.com",
      },
      students: [
        {
          name: "John",
          email: "John@gmail.com",
        },
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P1-I",
        name: "P1 Integrity",
      },
    };

    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(204);
    done();
  });

  test("should return Status Code 200 if data is already present in DB.", async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 1",
        email: "teacherone@gmail.com",
      },
      students: [
        {
          name: "John",
          email: "John@gmail.com",
        },
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P1-I",
        name: "P1 Integrity",
      },
    };

    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(200);
    done();
  });

  test(`should return Status Code 400 if teacher input is missing during registration `, async (done) => {
    const reqbody = {
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        }
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2 Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Teacher input not found. Require teacher with name and email`
    );
    done();
  });

  test(`should return Status Code 400 if teacher's name is missing during registration `, async (done) => {
    const reqbody = {
      teacher: {
        email: "teachertwo@gmail.com",
      },
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        }
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2 Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Teacher's name input not found`);
    done();
  });

  test(`should return Status Code 400 if teacher's email input is missing during registration `, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
      },
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        }
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2 Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Teacher's email input not found`);
    done();
  });

  test(`should return Status Code 400 if students data is missing during registration `, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
        email: "teachertwo@gmail.com",
      },
      students: [],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2 Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Require at least one student (name and email) for registration`
    );
    done();
  });

  test(`should return Status Code 400 if students data is missing during registration `, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
        email: "teachertwo@gmail.com",
      },
      students: [
        {
          name: "Jack",
        }
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2 Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Student's email input not found`
    );
    done();
  });

  test(`should return Status Code 400 if subject code is missing during registration `, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
        email: "teachertwo@gmail.com",
      },
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        },
      ],
      subject: {
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2 Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Subject Code input not found`);
    done();
  });

  test(`should return Status Code 400 if class name is missing during registration `, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
        email: "teachertwo@gmail.com",
      },
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        },
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Class Name not found`);
    done();
  });

  test(`should return Status Code 400 if email format is incorrect `, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
        email: "teachertwogmail.com",
      },
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        }
      ],
      subject: {
        subjectCode: "ENG",
        name: "English",
      },
      class: {
        classCode: "P2-I",
        name: "P2-Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Teacher's email must be in email format`
    );
    done();
  });

  test(`should return Status Code 400 if subject name and subject code are identical`, async (done) => {
    const reqbody = {
      teacher: {
        name: "Mr. Teacher 2",
        email: "teacher@twogmail.com",
      },
      students: [
        {
          name: "Jack",
          email: "Jack@gmail.com",
        }
      ],
      subject: {
        subjectCode: "ENG",
        name: "ENG",
      },
      class: {
        classCode: "P2-I",
        name: "P2-Integrity",
      },
    };

    expect.assertions(2);
    const response = await request.post("/api/register").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Subject Name and Subject Code cannot be the same`
    );
    done();
  });
    
  
});


describe(`POST 'api/register/update' route tests with varied request body input`, () => {
  test("should return Status Code 200 if teacher's details are successfully updated", async (done) => {
    const reqbody = {
      teacher: {
        email: "teacherone@gmail.com",
        updateName: "first teacher",
        updateEmail: "firstteacher@gmail.com"
      }
    }
    const response = await request.post("/api/register/update").send(reqbody);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Person details updated`);
    done();
  });


  test("should return Status Code 400 if more than one category update submitted", async (done) => {
    const reqbody = {
      teacher: {
        email: "teacherone@gmail.com",
        updateName: "teacher new",
        updateEmail: "newteacher@gmail.com"
      },
      student: {
        email: "john@gmail.com",
        updateName: "john new",
        updateEmail: "newjohn@gmail.com"
      }
    }
    const response = await request.post("/api/register/update").send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
        `Kindly update only Teacher, Student, Subject or Class information one at a time`
        );
    done();
  });


  test("should return Status Code 404 if teacher's email is not found in DB", async (done) => {
    const reqbody = {
      teacher: {
        email: "abc@gmail.com",
        updateName: "abc teacher",
        updateEmail: "abc@gmail.com"
      }
    }
    const response = await request.post("/api/register/update").send(reqbody);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Email not found. Kindly register`);
    done();
  });


})



//empty out all data in DB after ALL tests
afterAll(() => cleanDB(models))