let server = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
let expect = chai.expect;

describe('API Auth Tests', function () {
  let token = process.env.TOKEN
  let signup = {
    username: 'test',
    fullname: 'Testing Signup',    
    email: 'testing@test.com',
    password: 'test',
  };

  let signin = {
    username: 'aldiws',
    password: '123'
  };

  describe('POST /api/signup', () => {
    it('it should user signup', (done) => {
      chai.request('http://localhost:3000/api')
        .post('/signup')
        .type('form')
        .send(signup)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        })
    })
  });

  describe('POST /api/login', () => {
    it('it should user login', (done) => {
      chai.request('http://localhost:3000/api')
        .post('/login')
        .type('form')
        .send(signin)
        .end((err, res) => {                           
          expect(res.status).to.equal(200);  
          expect(res.body).not.to.be.empty;                  
          expect(res.body).to.have.ownProperty('token');                    
          expect(res.body).to.be.an('object');
          expect(err).to.be.null;
          done()
        })
    })
  });

})