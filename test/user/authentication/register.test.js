const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const sinon = require('sinon');
const registerController = require('../../../controller/user/authentication/controller'); // Replace with the path to your controller
const db = require('../../../config/db');
const utils = require('../../../controller/utils');

chai.use(chaiHttp);

describe('Register Controller', () => {
  describe('POST /register', () => {
    it('should create a new user and return a token and user data on success', async () => {
      // Mock request and response objects
      const request = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          deviceToken: 'test-device-token',
        },
      };
      const response = {
        send: sinon.stub(),
      };

      // Mock the necessary utility functions
      sinon.stub(utils, 'validateEmail').resolves();
      sinon.stub(utils, 'checkEmail').resolves();

      // Mock the database create function
      sinon.stub(db.User, 'create').resolves({
        login: sinon.stub().resolves('fake-token'),
        password: 'hashed-password',
      });

      // Call the register function
      await registerController.register(request, response);

      // Assertions
      expect(response.send.calledOnce).to.be.true;
      expect(response.send.firstCall.args[0]).to.have.property('message', 'user created ');
      expect(response.send.firstCall.args[0]).to.have.property('data');
      expect(response.send.firstCall.args[0].data).to.have.property('token', 'fake-token');
      expect(response.send.firstCall.args[0].data).to.have.property('user');

      // Restore the stubs
      sinon.restore();
    });

    it('should handle errors and call the next middleware on failure', async () => {
      // Mock request and response objects
      const request = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          deviceToken: 'test-device-token',
        },
      };
      const response = {
        send: sinon.stub(),
      };
      const next = sinon.stub();

      // Mock the necessary utility functions to throw an error
      sinon.stub(utils, 'validateEmail').throws({ httpStatus: 404, message: 'Email not found' });

      // Call the register function
      await registerController.register(request, response, next);

      // Assertions
      expect(response.send.called).to.be.false;
      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0]).to.have.property('httpStatus', 404);
      expect(next.firstCall.args[0]).to.have.property('message', 'Email not found');

      // Restore the stubs
      sinon.restore();
    });
  });
});