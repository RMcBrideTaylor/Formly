import { Application } from "express";
import express from "express";
import apiRoutes from "./routes/api";
import passport from './config/passport';
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import * as config from "./server.json"; // @TODO - This doesn't work

export class App {
  port: number;
  app: Application;
  repository?: Connection;
  cache: Connection;

  constructor() {
    this.port = config.port;
    this.app = express();
    this.init();
  }

  init() {
    this.middleware();
    this.routes();
  }

  async start() {
    // Start the app service listening on the configured port
    // this.repository = await createConnection(config.db);
    this.repository = await createConnection({
        "type": "mysql",
        "host": "localhost",
        "port": 32769,
        "username": "root",
        "password": "jooshu7eeshaich5NimeesheiTheip6g",
        "database": "formly",
        "synchronize": true,
        "logging": false,
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
  }

  routes() {
    this.app.use('/', apiRoutes);
  }
}
