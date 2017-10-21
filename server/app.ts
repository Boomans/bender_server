import GraphData from "../src/support/GraphData";

const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const getRouteMiddleware = require('./middlewares/getRoute');
const getBuildingsMiddleware = require('./middlewares/getBuildings');

import LoadReqRunner from '../src/support/LoadReqRunner';

const app = express()
    .use(bodyParser.json())
    .get('/ping', (req, res) => {
        res.send('ping');
    })
    .get('/get-route', getRouteMiddleware)
    .get('/get-buildings', getBuildingsMiddleware);

app.use('/static', express.static('/static'));

app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`)
});

LoadReqRunner.start();
GraphData.read();