const app = require('../dist/server').express.app
const server = require('../dist/server').server
const supertest = require('supertest')

const request = supertest(app)

afterAll(() => {
  server.then( serv => {
    serv.close()
  })
})

require("fs").readdirSync('./tests').forEach(function(file) {
  if(!file.includes('index')){
    const func = require(`./${ file }`);
    func(app, request)
  }
});
