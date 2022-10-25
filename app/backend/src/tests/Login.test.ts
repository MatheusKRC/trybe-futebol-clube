import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { clear } from 'console';
import LoginService from '../Services/LoginService';
import JWT from '../Utils/JWT';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

const loginWrongMock = {
  email: 'ghhfghfghdfghdfgh',
  password: 'secret_admin', 
};

const loginWrongMock2 = {
  email: 'admin@admin.com',
  password: 'hgfdhdfghdfghdfghd', 
};

const loginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin', 
};

const jwt = new JWT()
const jwtMock = jwt.generateToken(1, loginMock.email)

describe('Testes Seção de Users e Login', async () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Users, "findOne").resolves({ 
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', } as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })
   
  it('A Rota Login existe', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send(loginMock)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.have.property('token')
  })

});


describe('Testes dos Erros Seção de Users e Login', async () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Users, "findOne").resolves({ email: 'user@admin.com',
    password: 'senha_incorreta', } as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })
   
  it('A Rota Login existe retorna erro de usuário inexistente', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send(loginWrongMock)

    expect(response.status).to.be.equal(401)
    expect(response.body.message).to.be.deep.equal('Incorrect email or password')
  })

  it('A Rota Login existe retorna erro de usuário inexistente', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send(loginWrongMock2)

    expect(response.status).to.be.equal(401)
    expect(response.body.message).to.be.deep.equal('Incorrect email or password')
  })

  it('A Rota Login existe e retorna erro de campos faltando', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send({email: 'admin@admin.com'})

    expect(response.status).to.be.equal(400)
    expect(response.body.message).to.be.deep.equal('All fields must be filled')
  })

  it('A Rota Login existe e retorna erro de campos faltando', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send({password: 'secret_admin'})

    expect(response.status).to.be.equal(400)
    expect(response.body.message).to.be.deep.equal('All fields must be filled')
  })

  it('A Rota Login/Validate não existe', async () => {
    const response = await chai
    .request(app)
    .get('/login/validate')

    expect(response.status).to.be.equal(401)
  })
});

