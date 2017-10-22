import MainDAO from "../dao/MainDAO";

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
    }

    getData() {
        return this._ready ? this._graphData : false;
    }

}
export default new GraphData();