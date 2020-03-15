import { Application } from "express"
import { Connection, ConnectionOptions, DatabaseType, createConnection } from "typeorm"
import { Client } from './models/client'

import crypto from 'crypto'
import express from "express";
import bearerToken from 'express-bearer-token'
import apiRoutes from "./routes/api"
import passport from './config/passport'


export class App {
  port: number
  app: Application
  server? : any // @TODO - Explicity require server instance
  repository?: Connection
  cache: Connection
  dbConfig : any

  constructor() {
    if (process.env.APP_ENV && process.env.APP_ENV === 'test' ) {
      // If this is test mode
      require('dotenv').config({ path: '.env.test' })
      this.dbConfig = {
        "type" : "sqlite",
        "database" : ":memory:",
        "dropSchema" : true,
        "synchronize": true,
        "entities": [
           "dist/models/**/*.js"
        ],
        "migrations": [
           "dist/migrations/**/*.js"
        ]
      }

    } else {
      require('dotenv').config({ path: '.env' })

      const type : any = String(process.env.DB_TYPE) || 'mongodb'
      this.dbConfig = {
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
        }
    }

    this.port = Number(process.env.APP_PORT || 3001);
    this.app = express();
    this.init();
  }

  init() {
    this.middleware();
    this.routes();
  }

  async start() {

    // Set up database connection
    this.repository = await createConnection(this.dbConfig)

    // @TODO refactor this to use host so you can run it behind a proxy
    this.server = this.app.listen(this.port)

    // tslint:disable-next-line:no-console
    console.log(`Server started at https://localhost:${ this.port }`)

    return this.server

  }

  middleware() {
    // Load any global middleware
    this.app.use(passport.initialize());
    this.app.use(express.json())
    this.app.use(bearerToken())
  }

  routes() {
    this.app.use('/', apiRoutes);
  }
}
