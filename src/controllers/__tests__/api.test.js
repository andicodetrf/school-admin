import app from '../../app' // Link to your server file
import supertest from 'supertest'
const request = supertest(app)

//test server connection
describe(`'/api/healthcheck' should return Status 200`, () => {
    test('to pass if status returns 200', async done => {
    const response = await request.get('/api/healthcheck')
    expect(response.status).toBe(200)
    done() 
    })
})

//to test db-related routes, ensure the docker container is running 
