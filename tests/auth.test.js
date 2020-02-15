const app = require('../dist/server')
const supertest = require('supertest')
const request = supertest(app)

it('auth endpoint returns', async done => {
  const res = await request.get('/auth')
  expect(res.status).toBe(200)
  done()
})
