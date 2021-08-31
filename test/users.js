const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const expect = chai.expect
require('dotenv').config();
const { TESTING_ORIGIN } = process.env

const baseUrl = 'http://localhost:5000/justnews/api/v1/users'

describe('Users', () => {
  let userId = 0
  describe('Get users', () => {
    it('Response format get all user', done => {
      chai.request(baseUrl)
        .get('/')
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Get all users success')
          expect(res.body.data).to.be.a('array')
          done()
        })
    })

    it('Response format get user by id', done => {
      chai.request(baseUrl)
        .get('/1')
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyNzE4NzU1Mn0.wdq97LUqxzQDDTHBaHAhteXXgLG3CgTREFSr0zHjOZU'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Get user success')
          expect(res.body.data).to.be.a('object')
          done()
        })
    })
  })

  describe('Add user', () => {
    const wrongBody = {
      email: 'unittest1@gmail.com',
      phone: '085326457341'
    }
    const trueBody = {
      email: 'unittest1@gmail.com',
      phone: '27348982451',
      password: 'unittest'
    }
    it('Check if email or password empty', done => {
      chai.request(baseUrl)
        .post('/')
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .send(wrongBody)
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(400)
          expect(res.body).to.have.property('message').with.equal('Field can`t empty')
          done()
        })
    })
    it('Response format when add new user', done => {
      chai.request(baseUrl)
        .post('/')
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .send(trueBody)
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(201)
          expect(res.body).to.have.property('message').with.equal('Add user success')
          expect(res.body.data).to.have.property('id')
          userId = res.body.data.id
          done()
        })
    })
  })

  describe('Update Users', () => {
    const userId = 3
    const body = {
      phone: '23947865435',
      username: 'unittest',
      name: 'unit test'
    }
    it('Response format', done => {
      chai.request(baseUrl)
        .patch(`/${userId}`)
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyNzE5MzEwMH0.mYy6lwj_HyNMrZDRbNK_AmpuqqIRICh5tbI17acnUzE'
        })
        .send(body)
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Update user success')
          done()
        })
    })
  })

  describe('Delete User', () => {
    // const userId = 10
    it('Response when user not found', done => {
      chai.request(baseUrl)
        .delete(`/${userId + 1}`)
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(400)
          expect(res.body).to.have.property('message').with.equal('User not found!')
          done()
        })
    })

    it('Response format', done => {
      chai.request(baseUrl)
        .delete(`/${userId}`)
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Delete user success')
          done()
        })
    })
  })
})