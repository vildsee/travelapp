const app = require('../src/server/server.js')
app.listen(3000)

const supertest = require('supertest')
const request = supertest(app)

app.get('/test', async (req,res) => {
    res.json({message: 'pass'})
})

it('Gets the endpoint', async done => {
    const res = await request.get('/test')

    done()
})

it('gets the endpoint', async done => {
    const response = await request.get('/test')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass')
    done()
})