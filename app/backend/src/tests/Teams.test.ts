import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { clear } from 'console';
import Teams from '../database/models/Teams';
import teamsMock from './Mocks/teamsMocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da Rota Teams', async () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Teams, "findAll").resolves(teamsMock as any);
  });

  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })
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
})

describe('Testes dos Erros da Rota Teams', async () => {
         it('A rota de Teams/:id existe', async () => {
          const response = await chai
          .request(app)
          .get('/teams/:id')
      
          expect(response.status).to.be.equal(400)
         });
  })