import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { clear } from 'console';
import Matches from '../database/models/Matches';
import matchesMock from './Mocks/matchesMock';
import MatchesServices from '../Services/MatchesServices';

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

      it('A Rota POST Matches retorna erro de Token inválido', async () => {
        const response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
     
        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.be.deep.equal('Token must be a valid token')
      })
      
      it('A Rota PATCH Matches retorna erro de Token inválido', async () => {
        const response = await chai
        .request(app)
        .patch('/matches/:id')
     
        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.be.deep.equal('Token not found')
      })


      it('A Rota PATCH Matches retorna erro de Token inválido', async () => {
        const response = await chai
        .request(app)
        .patch('/matches/:id/finish')
     
        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.be.deep.equal('Token not found')
      })

      it('Teste do service getMatchesProgress', async () => {
        const service = new MatchesServices()
        const result = await service.getMatchesProgress(true)

        expect(result.status).to.be.deep.equal(null)
      })

      it('Teste de erro do service getMatchesProgress', async () => {
        const service = new MatchesServices()
        const result = await service.finishMatch('1')

        expect(result.status).to.be.deep.equal(400)
      })

      it('Teste do service postMatch', async () => {
        const service = new MatchesServices()
        const result = await service.postMatch(postMock as Matches)

        expect(result.status).to.be.deep.equal(null)
      })
  })

