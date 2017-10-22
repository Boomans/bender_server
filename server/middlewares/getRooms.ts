
import {sendData, Success, Error} from "../../src/support/http";
import getMainData from "../../src/support/getMainData";

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
    const mainData = getMainData();
    loadData = mainData.loadData;
    graphData = mainData.graphData;
    return graphData;
}