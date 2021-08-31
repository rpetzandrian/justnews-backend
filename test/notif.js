const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const expect = chai.expect
require('dotenv').config();
const { TESTING_ORIGIN } = process.env

const baseUrl = 'http://localhost:5000/justnews/api/v1/notif'

// describe('Notif Test', () => {
//   describe('Get Notif', () => {

//   })
// })