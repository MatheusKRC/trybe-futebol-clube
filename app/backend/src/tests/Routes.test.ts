import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { clear } from 'console';
import LoginService from '../Services/LoginService';
// import MatchesServices from '../Services/MatchesServices';
import TeamsServices from '../Services/TeamsServices';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
};

const team1 = {
  id: 1,
  teamName: "Avaí/Kindermann"
}
describe('Testes Seção de Users e Login', () => {
  it('A rota de Login existe', async () => {
   const response = await chai
   .request(app)
   .post('/login')
   .send(loginMock)

   expect(response.status).to.be.equal(200)
   expect
  });

  it('A rota de Teams existe', async () => {
    const response = await chai
    .request(app)
    .get('/teams')
 
    expect(response.status).to.be.equal(200)
   });

   it('A rota de Teams/:id existe', async () => {
    const response = await chai
    .request(app)
    .get('/teams/:id')

    expect(response.status).to.be.equal(200)
   });

   it('A rota de Matches existe', async () => {
    const response = await chai
    .request(app)
    .get('/matches')
 
    expect(response.status).to.be.equal(200)
   })

});
