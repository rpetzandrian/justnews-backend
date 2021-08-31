const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

const baseUrl = 'http://localhost:5000/justnews/api/v1/auth'
// const loginUrl = '/justnews/api/v1/auth/login'
// const registerUrl = '/justnews/api/v1/auth/register'
// const AuthModel = require('../models/AuthModel')

// describe.skip('Response in Login', () => {
//   it('It`s statusCode should return 200 when success, 400 when error', async () => {
//     const request = {
//       email: 'test1@gmail.com',
//       password: 'test1'
//     }
//     try {
//       const result = await AuthModel.login(request)
//       expect(result.statusCode).to.be.equal(200)
//     } catch (err) {
//       expect(err.statusCode).to.be.equal(500)
//     }
//   })
// })

describe('Auth Login', () => {
  const origin = 'http://localhost:3000'
  const bodyTrue = { email: 'test1@gmail.com', password: 'test1' }
  const bodyFalse = { email: 'test1@gmail.com', password: 'test' }
  const wrongBody = { email: 'test1@gmail.com' }

  describe('Response in login', () => {
    it('Format response', (done) => {
      chai.request(baseUrl)
        .post('/login')
        .set('Origin', origin)
        .send(bodyTrue)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.request).to.have.header('Origin')
          expect(res.body.data).to.have.property('token')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('role')
          expect(res.body.statusCode).to.be.equal(200)
          expect(res.body.message).to.be.equal('Login Success')
          done()
        })
    })

    it('Format err response', (done) => {
      chai.request(baseUrl)
        .post('/login')
        .set('Origin', origin)
        .send(bodyFalse)
        .end((err, res) => {
          expect(res.request).to.have.header('Origin')
          expect(res.body.statusCode).to.be.equal(400)
          expect(res.body.message).to.be.equal('User unregistered')
          done()
        })
    })
  })

  describe('Request in Login', () => {
    it('Request Format', (done) => {
      chai.request(baseUrl)
        .post('/login')
        .set('Origin', origin)
        .send(bodyTrue)
        .end((err, res) => {
          // expect(res.body).to.have.property('message').with.equal('Field can`t empty')
          expect(bodyTrue).to.be.a('object')
          expect(bodyTrue).to.have.property('email')
          expect(bodyTrue).to.have.property('password')
          expect(res.request).to.have.header('Origin')
          expect(res.request).to.have.header('Origin', 'http://localhost:3000')
          done()
        })
    })

    it('Request Format Err', (done) => {
      chai.request(baseUrl)
        .post('/login')
        .set('Origin', origin)
        .send(wrongBody)
        .end((err, res) => {
          expect(res.body).to.have.property('message').with.equal('Field can`t empty')
          expect(res.request).to.have.header('Origin', 'http://localhost:3000')
          done()
        })
    })
  })
})

