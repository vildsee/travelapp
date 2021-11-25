const app = require('../src/server/server.js')
const supertest = require('supertest')
const request = supertest(app)

app.get('/test', async (req,res) => {
    res.json({message: 'pass'})
})

test('Gets the endpoint', async done => {
    const res = await request.get('/test')

    done()    
})

test('gets the endpoint', async done => {
    const response = await request.get('/test')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass')
    done()
})