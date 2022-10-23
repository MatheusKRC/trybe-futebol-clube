import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
};

const teamMock = 
  [
    {
      id: '1',
      teamName: 'Avaí/Kindermann',
    },
    {
      id: '2',
      teamName: 'Bahia',
    },
    {
      id: '3',
      teamName: 'Botafogo',
    },
    {
      id: '4',
      teamName: 'Corinthians',
    },
    {
      id: '5',
      teamName: 'Cruzeiro',
    },
    {
      id: '6',
      teamName: 'Ferroviária',
    },
    {
      id: '7',
      teamName: 'Flamengo',
    },
    {
      id: '8',
      teamName: 'Grêmio',
    },
    {
      id: '9',
      teamName: 'Internacional',
    },
    {
      id: '10',
      teamName: 'Minas Brasília',
    },
    {
      id: '11',
      teamName: 'Napoli-SC',
    },
    {
      id: '12',
      teamName: 'Palmeiras',
    },
    {
      id: '13',
      teamName: 'Real Brasília',
    },
    {
      id: '14',
      teamName: 'Santos',
    },
    {
      id: '15',
      teamName: 'São José-SP',
    },
    {
      id: '16',
      teamName: 'São Paulo',
    },
  ]


describe('Testes Seção de Users e Login', () => {
  it('A rota de Login existe', async () => {
   const response = await chai
   .request(app)
   .post('/login')
   .send(loginMock)

   expect(response.status).to.be.equal(200)
  });

  it('A rota de Teams existe', async () => {
    const response = await chai
    .request(app)
    .get('/teams')
 
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(teamMock)
   });
});
