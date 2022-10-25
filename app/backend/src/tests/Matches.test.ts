import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { clear } from 'console';
import Matches from '../database/models/Matches';
import matchesMock from './Mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin', 
};

const postMock = {
  homeTeam: 16, 
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

describe('Testes da Rota Matches', async () => {

    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon.stub(Matches, "findAll").resolves(matchesMock as any);
    });
  
    afterEach(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })

      it('A rota GET Matches existe', async () => {
     
          const response = await chai
          .request(app)
          .get('/matches')
       
          expect(response.status).to.be.equal(200)
         });
      
      it('A Rota POST Matches retorna erro', async () => {
        const response = await chai
        .request(app)
        .post('/matches')
     
        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.be.deep.equal('Token not found')
      })

      it('A Rota POST Matches retorna erro', async () => {
        const response = await chai
        .request(app)
        .post('/matches')
     
        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.be.deep.equal('Token not found')
      })

      
  })

