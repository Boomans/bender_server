
import {sendData, Success, Error} from "../../src/support/http";
import LoadReqRunner from "../../src/support/LoadReqRunner";
import GraphData from "../../src/support/GraphData";

let loadData;
let graphData;

module.exports = (pool) => (req, res) => {
    let {floor} = req.query;
    if (!floor) {
        sendData(res, Error('wrong params'));
        return;
    }
    floor = Number(floor);

    checkData().then(graphData => {
        const result = [];
        graphData.forEach(elem => {
            if (elem.floor === floor) {
                const copy = Object.assign({}, elem);
                delete copy.ways;
                copy.load = loadData.get(copy.roomId);
                result.push(copy);
            }
        });
        sendData(res, Success(result));
    }).catch(err => {
        sendData(res, Error(err));
    });
};

async function checkData() {
    loadData = LoadReqRunner.getData();
    if (!loadData) {
        throw 'Load data is not ready';
    }
    graphData = GraphData.getData();
    if (!graphData) {
        throw 'Graph data is not ready';
    }
    return graphData;
}