const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

const baseUrl = 'http://localhost:5000/justnews/api/v1/posts'

describe('Posts', () => {
  const origin = 'http://localhost:3000'
  describe('Get Posts', () => {
    it('Response format when data found', done => {
      chai.request(baseUrl)
        .get('/?limit=1')
        .set({ Origin: origin })
        .end((err, res) => {
          expect(res.body).to.have.property('statusCode').with.equal(200)
          expect(res.body).to.have.property('message')
          expect(res.body.data).to.have.property('post')
          expect(res.body.data).to.have.property('total_pages')
          done()
        })
    })

    it('Response format when data not found', done => {
      chai.request(baseUrl)
        .get('/?limit=0')
        .set({ Origin: origin })
        .end((err, res) => {
          expect(res.body).to.have.property('statusCode').with.equal(400)
          expect(res.body).to.have.property('message').with.equal('Post not found!')
          expect(res.body).not.to.have.property('data')
          done()
        })
    })
  })

  // describe('Add Post', () => {
  //   it('Response when field empty', done => {
  //     chai.request(baseUrl)
  //       .post('/')
  //       .query({

  //       })
  //   })
  // })
})