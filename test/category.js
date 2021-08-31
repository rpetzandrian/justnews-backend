const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const expect = chai.expect
require('dotenv').config();
const { TESTING_ORIGIN } = process.env

const baseUrl = 'http://localhost:5000/justnews/api/v1/category'

describe('Category Test', () => {
  let id = 0
  describe('Get Category', () => {
    it('Response format get category', done => {
      chai.request(baseUrl)
        .get('/')
        .set({
          origin: TESTING_ORIGIN
        })
        .end((err, res) => {
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Get all categories success')
          expect(res.body.data).to.be.a('array')
          done()
        })
    })

    it('Response format get user by id', done => {
      chai.request(baseUrl)
        .get('/1')
        .set({
          origin: TESTING_ORIGIN,
        })
        .end((err, res) => {
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Get category success')
          expect(res.body.data).to.be.a('object')
          done()
        })
    })
  })

  describe('Add Category', () => {
    const wrongBody = {
      description: 'Category Unit testing'
    }

    const trueBody = {
      category: 'UnitTesting',
      description: 'Category Unit testing'
    }

    it('Check if category`s name empty', done => {
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
          expect(res.body).to.have.property('message').with.equal('Request is empty')
          done()
        })
    })

    it('Response format when add new category', done => {
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
          expect(res.body).to.have.property('message').with.equal('Add category success')
          expect(res.body.data).to.have.property('id')
          id = res.body.data.id
          done()
        })
    })
  })

  describe('Update Category', () => {
    // const id = 6
    const body = {
      category: 'UnitTesting Update'
    }
    it('Response format', done => {
      chai.request(baseUrl)
        .patch(`/${id}`)
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .send(body)
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Update category success')
          done()
        })
    })
  })

  describe('Delete Category', () => {
    // const id = 6 
    it('Response format', done => {
      chai.request(baseUrl)
        .delete(`/${id}`)
        .set({
          origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .end((err, res) => {
          expect(err).equal(null)
          expect(res.body).to.have.property('statusCode').with.equal(res.status).with.equal(200)
          expect(res.body).to.have.property('message').with.equal('Delete category success')
          done()
        })
    })
  })
})