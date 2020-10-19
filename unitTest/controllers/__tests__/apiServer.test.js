import app from '../../../src/app'; //link to server file
import supertest from 'supertest'
const request = supertest(app)


//test server connection
describe(`'/api/healthcheck' should return Status Code 200`, () => {
  test('to pass if it returns status code 200', async done => {
    const response = await request.get('/api/healthcheck')
    expect(response.status).toBe(200)
    done() 
  })
})
  

//test invalid URL endpoint
describe(`invalid enpoint such as '/api/abc' should return Status Code 404`, () => {
  test('to pass if it returns status code 404', async done => {
    const response = await request.get('/api/abc')
    expect(response.status).toBe(404)
    done() 
  })
})  


