import {sendData, Success, Error} from '../../src/support/http';
import LoadReqRunner from '../../src/support/LoadReqRunner';
import GraphData from '../../src/support/GraphData';

let loadData;
let graphData;

module.exports = (req, res) => {
    analyse().then(result => {
        sendData(res, Success(result));
    }).catch(err => {
        sendData(res, Error(err));
    });
};

async function analyse() {
    loadData = LoadReqRunner.getData();
    if (!loadData) {
        throw 'Load data is not ready';
    }
    graphData = GraphData.getData();
    if (!graphData) {
        throw 'Graph data is not ready';
    }

    const buildingHash = {};
    graphData.forEach(room => {
        let key = `${room.building}_${room.floor}`;
        let cache = buildingHash[key];
        if (cache) {
            cache.count++;
            cache.load += loadData.get(room.roomId);
        } else {
            buildingHash[key] = {
                count: 1,
                load: loadData.get(room.roomId)
            };
        }
    });
    Object.keys(buildingHash).forEach(key => {
        const hash = buildingHash[key];
        hash.load = hash.load / hash.count;
    });
    return buildingHash;
}