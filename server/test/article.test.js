let server = require('../app')
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
let expect = chai.expect;

describe('API Article Tests', function () {
  let token = process.env.TOKEN
  let idArticle = '5a8a9af6dad45e3185b38cb6'
  let article = {
    title: 'Testing Create title',
    content: 'Testing Create content'
  };

  let updateArticle = {
    title: 'Testing Update title',
    content: 'Testing Update content'
  };

  describe('GET /article', () => {
    it('it should get all articles', (done) => {
      chai.request('http://localhost:3000/api/articles')
        .get('/')
        .set('token', token)
        .end((err, res) => {          
          expect(res.status).to.equal(200);          
          expect(res.body).to.have.ownProperty('data');
          expect(err).to.be.null;
          done()
        })
    })
  });

  describe('POST /article', () => {
    it('it should create a articles', (done) => {
      chai.request('http://localhost:3000/api/articles')
        .post('/')
        .set('token', token)
        .type('form')
        .send(article)
        .end((err, res) => {
          expect(res.status).to.equal(200);          
          expect(res.body).to.have.ownProperty('data');
          expect(err).to.be.null;
          done();
        })
    })
  });

  describe('GET /article/:id', () => {
    it('it should Get articles by id', (done) => {
      chai.request('http://localhost:3000/api/articles')
        .get(`/${idArticle}`)
        .set('token', token)
        .end((err, res) => {                    
          expect(res.status).to.equal(200);          
          expect(res.body).to.have.ownProperty('data');
          expect(err).to.be.null;
          done();
        })
    })
  });

  describe('PUT /article/:id', function () {
    it('it should Update articles by id', function (done) {
      chai.request('http://localhost:3000/api/articles')
        .put(`/${idArticle}`)
        .set('token', token)
        .send(updateArticle)
        .end((err, res) => {          
          expect(res.status).to.equal(200);          
          expect(res.body).to.have.ownProperty('data');
          expect(err).to.be.null;
          done()
        })
    })
  });

  describe('DELETE /article/:id', function () {
    it('delete article', function (done) {
      chai.request('http://localhost:3000/api/articles')
        .del(`/${idArticle}`)
        .set('token', token)
        .end(function (err, res) {
          expect(res.status).to.equal(200);          
          expect(res.body).to.have.ownProperty('data');
          expect(err).to.be.null;
          done(err)
        })
    })
  });

})