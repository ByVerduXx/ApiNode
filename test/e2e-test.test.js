const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('E2E Test', () => {
  it('should return hello world', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        chai.assert.equal(res.text, 'Hello World!');
        done();
      });
  })
});