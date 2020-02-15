import express from "express";
import apiRoutes from "./routes/api";

const app = express();
const listenPort = 8080;

// Set up api routing
app.use('/', apiRoutes)

app.listen(listenPort, () => {
    // tslint:disable-next-line:no-console
    // console.log( `server started at http://localhost:${ listenPort }` );
})

module.exports = app
