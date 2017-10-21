import GraphData from "../../src/support/GraphData";

import AdjMatrix from "../../src/graph/AdjMatrix";
import {sendData, Success, Error} from '../../src/support/http';
import LoadReqRunner from '../../src/support/LoadReqRunner';

let graphData;
let loadData;

module.exports = (pool) => (req, res) => {
    const {from, to} = req.query;
    if (!from || !to) {
        sendData(res, Error('wrong params'));
        return;
    }

    analyse(from, to).then(result => {
        sendData(res, Success(result));
    }).catch(err => {
        sendData(res, Error(err));
    });
};

async function analyse(from, to): Promise<any> {
    loadData = LoadReqRunner.getData();
    if (!loadData) {
        throw 'Load data is not ready';
    }
    graphData = GraphData.getData();
    if (!graphData) {
        throw 'Graph data is not ready';
    }
    const adjMatrix = new AdjMatrix(graphData, loadData);
    await adjMatrix.createMatrix();

    return await adjMatrix.getEasiestPaths(from, to);
}
