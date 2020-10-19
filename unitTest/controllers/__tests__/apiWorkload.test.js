import app from '../../../src/app'; 
import supertest from 'supertest'
const request = supertest(app)

//to test db-related routes, ensure the docker container is running 

describe(`after seeding into DB, GET '/api/reports/workload' should return JSON format of all registered teachers, their subjects taken and no of classes for each subject taught`, () => {
  test('to pass if seed succeeded with GET request on workload', async done => {
    const response = await request.get('/api/reports/workload')
    expect(response.body).toEqual({
      "status": 200,
      "report": {
        "mr. petersd": [
          {
            "subjectCode": "ENGSD",
            "subjectName": "EnglishSD",
            "numberOfClasses": 2
          }
        ],
        "mr. smithsd": [
          {
            "subjectCode": "ENGSD",
            "subjectName": "EnglishSD",
            "numberOfClasses": 1
          },
          {
            "subjectCode": "MATHSD",
            "subjectName": "MathematicsSD",
            "numberOfClasses": 1
          }
        ]
      }
    })
    done() 
  })
})

//seed data will be removed after test