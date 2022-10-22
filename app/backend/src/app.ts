import * as express from 'express';
import LoginControllers from './Controllers/LoginControllers';
import authMidlleware from './middlewares/auth.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    const LoginController = new LoginControllers();
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', LoginController.login);
    this.app.get('/login/validate', authMidlleware, LoginController.getRole);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
