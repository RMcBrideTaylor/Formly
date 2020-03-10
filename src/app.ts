import { Application } from "express";
import express from "express";
import apiRoutes from "./routes/api";
import passport from './config/passport';
import { Connection, ConnectionOptions, DatabaseType, createConnection } from "typeorm";

export class App {
  port: number;
  app: Application;
  repository?: Connection;
  cache: Connection;

  constructor() {
    require('dotenv').config()

    this.port = Number(process.env.APP_PORT);
    this.app = express();
    this.init();
  }

  init() {
    this.middleware();
    this.routes();
  }

  async start() {
    // Start the app service listening on the configured port

    const type : any = String(process.env.DB_TYPE) || 'mongodb'

    this.repository = await createConnection({
        "type": type,
        "host": process.env.DB_HOST || 'localhost',
        "port": Number(process.env.DB_PORT) || 3306,
        "username": process.env.DB_USERNAME || 'root',
        "password": process.env.DB_PASSWORD || 'root',
        "database": process.env.DB_DATABASE || 'formly',
        "synchronize": Boolean(process.env.DB_SYNC) || true,
        "logging": Boolean(process.env.DB_LOGGING) || false,
        "entities": [
           "dist/models/**/*.js"
        ],
        "migrations": [
           "dist/migrations/**/*.js"
        ],
        "cli": {
             "migrationsDir": "src/migrations"
         }
      });

    // @TODO refactor this to use host to you can run it behind a proxy
    const server = this.app.listen(this.port, () => {
      // @TODO - Remove console.log in favor of proper logging
      // tslint:disable-next-line:no-console
      console.log( `Server listening on http://localhost:${ this.port }` );
    })

  }

  middleware() {
    // Load any global middleware
    this.app.use(passport.initialize());
    this.app.use(express.json())
  }

  routes() {
    this.app.use('/', apiRoutes);
  }
}
