const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
require('dotenv').config();
const { TESTING_ORIGIN } = process.env

const baseUrl = 'http://localhost:5000/testing/middleware'

describe('Testing Middleware', () => {
  describe('JSON Web Token', () => {
    it('Token not provided', done => {
      chai.request(baseUrl)
        .get('/adminonly')
        .set({
          Origin: TESTING_ORIGIN,
          'user-token': 'axcZzxvbsjbcxnxmczvnmxcvusdfn,xmcnvisdfk'
        })
        .end((err, res) => {
          expect(res.status).equal(403)
          expect(res.body).to.have.property('message').with.equal('jwt must be provided')
          expect(res.body).to.have.property('statusCode').with.equal(res.status)
          done()
        })
    })

    it('Not admin', done => {
      chai.request(baseUrl)
        .get('/adminonly')
        .set({
          Origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyNzE4MTUxM30.0Cr4VQ3IR9eC1rZWO-lYi54GugvbQHLpFezd2cOFjrM'
        })
        .end((err, res) => {
          expect(res.status).equal(403)
          expect(res.body).to.have.property('message').with.equal('Forbidden')
          expect(res.body).to.have.property('statusCode').with.equal(res.status)
          done()
        })
    })

    it('Token not valid', done => {
      chai.request(baseUrl)
        .get('/adminonly')
        .set({
          Origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        })
        .end((err, res) => {
          expect(res.status).equal(403)
          expect(res.body).to.have.property('message').with.equal('jwt malformed')
          expect(res.body).to.have.property('statusCode').with.equal(res.status)
          done()
        })
    })

    it('Admin', done => {
      chai.request(baseUrl)
        .get('/adminonly')
        .set({
          Origin: TESTING_ORIGIN,
          'user-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcxODE4MTd9.lzBB9ntddVeK5bhh3fTVapPJQqADSMJEg1T3vw2UthQ'
        })
        .end((err, res) => {
          expect(res.status).equal(200)
          expect(res.body).to.have.property('message').with.equal('This site is admin only')
          expect(res.body).to.have.property('statusCode').with.equal(res.status)
          done()
        })
    })
  })
})

