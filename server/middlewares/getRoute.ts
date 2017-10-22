import AdjMatrix from "../../src/graph/AdjMatrix";
import {sendData, Success, Error} from '../../src/support/http';
import getMainData from "../../src/support/getMainData";

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
    const mainData = getMainData();
    loadData = mainData.loadData;
    graphData = mainData.graphData;

    const adjMatrix = new AdjMatrix(graphData, loadData);
    await adjMatrix.createMatrix();

    return await adjMatrix.getEasiestPaths(from, to);
}
