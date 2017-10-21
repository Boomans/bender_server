import MainDAO from "../dao/MainDAO";

const fs = require('fs');

class GraphData {
    private _graphData: Map<any, any>;
    private _ready: boolean;

    constructor() {
        this._ready = false;
    }

    read(pool) {
        MainDAO.getAll(pool).then(result => {
            this._graphData = new Map();
            result.forEach(room => {
                let buff = this._graphData.get(room.id);
                if (buff) {
                    buff.ways.push(room.id === room.idroom1 ? room.idroom2 : room.idroom1);
                } else {
                    this._graphData.set(room.id, {
                        roomId: room.id,
                        floor: room.floor,
                        building: room.building,
                        ways: [room.id === room.idroom1 ? room.idroom2 : room.idroom1]
                    });
                }
            });
            this._ready = true;
        });

        /*let graphDataF1 = fs.readFileSync(__dirname + '/../../../static/info_f1.json', {encoding: 'utf8'});
        let graphDataF2 = fs.readFileSync(__dirname + '/../../../static/info_f2.json', {encoding: 'utf8'});
        let graphDataSpecialF1 = fs.readFileSync(__dirname + '/../../../static/special_f1.json', {encoding: 'utf8'});
        let graphDataSpecialF2 = fs.readFileSync(__dirname + '/../../../static/special_f2.json', {encoding: 'utf8'});

        graphDataF1 = JSON.parse(graphDataF1);
        graphDataF2 = JSON.parse(graphDataF2);
        graphDataSpecialF1 = JSON.parse(graphDataSpecialF1);
        graphDataSpecialF2 = JSON.parse(graphDataSpecialF2);

        this._graphData = [];
        this._graphData = this._graphData.concat(graphDataF1);
        this._graphData = this._graphData.concat(graphDataF2);
        this._graphData = this._graphData.concat(graphDataSpecialF1);
        this._graphData = this._graphData.concat(graphDataSpecialF2);*/
    }

    getData() {
        return this._ready ? this._graphData : false;
    }

}
export default new GraphData();