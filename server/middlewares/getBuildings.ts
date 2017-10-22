import {sendData, Success, Error} from '../../src/support/http';
import getLoadById from "../../src/support/getLoadById";
import getMainData from "../../src/support/getMainData";

let loadData;
let graphData;

module.exports = (pool) => (req, res) => {
    analyse().then(result => {
        sendData(res, Success(result));
    }).catch(err => {
        sendData(res, Error(err));
    });
};

async function analyse() {
    const mainData = getMainData();
    loadData = mainData.loadData;
    graphData = mainData.graphData;

    const buildingHash = {};
    graphData.forEach(room => {
        let key = `${room.building}_${room.floor}`;
        let cache = buildingHash[key];
        if (cache) {
            cache.count++;
            cache.load += loadData.get(room.roomId) || getLoadById(room.roomId);
        } else {
            buildingHash[key] = {
                count: 1,
                load: loadData.get(room.roomId) || getLoadById(room.roomId)
            };
        }
    });
    Object.keys(buildingHash).forEach(key => {
        const hash = buildingHash[key];
        hash.load = hash.load / hash.count;
    });
    return buildingHash;
}