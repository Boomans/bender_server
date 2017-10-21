import {IRoom} from "../graphModels/Room";
import getLoadById from "../support/getLoadById";

export default class AdjMatrix{
    private loadData: Map<string | number, number>;
    private matrix: Map<any, any>;
    private graphMap: Map<any, IRoom>;
    constructor(graphMap: Map<any, IRoom>, loadData: Map<string | number, number>) {
        this.graphMap = graphMap;
        this.loadData = loadData;
    }

    async createMatrix() {
        this.graphMap.forEach(room => {
            room.load = this.loadData.get(room.roomId);
            if (!room.load) {
                room.load = getLoadById(room.roomId); // TODO определять тип и назначать правильный load
            }
        });
        let matrix = new Map();
        this.graphMap.forEach(roomA => {
            let subMatrix = new Map();
            matrix.set(roomA.roomId, subMatrix);
            this.graphMap.forEach(roomB => {
                subMatrix.set(roomB.roomId, AdjMatrix._getWeight(roomA.roomId, roomB));
            });
        });
        this.matrix = matrix;
        //this._printMatrix(this.matrix);
    }

    _printMatrix(matrix) {
        let qqq= ['       '];
        matrix.forEach((item, id) => {
            qqq.push(id);
        });
        console.log(qqq.join('\t'));
        matrix.forEach((elem, i) => {
            let arr = [`${i}: `];
            elem.forEach((isWay) => {
                arr.push(isWay);
            });
            console.log(arr.join('\t'));
        });
    }

    //Алгоритм Дейкстры
    async getEasiestPaths(from: string, to: string) {
        const INF = Number.MAX_SAFE_INTEGER;
        const ans = new Map();
        const parents = new Map();
        this.graphMap.forEach((room, id) => {
            ans.set(id, INF);
            parents.set(id, -1);
        });
        ans.set(to, 0);
        let queue = [];
        queue.push([0, to]);

        while(queue.length !== 0) {
            let queueCurr = queue[queue.length - 1];
            queue.pop();
            let dst = queueCurr[0];
            let vertex = queueCurr[1];
            if (ans.get(vertex) < dst) {
                continue;
            }

            this.matrix.get(vertex).forEach((weight, id) => {
                let n_dst = dst + this.matrix.get(vertex).get(id);
                if (n_dst < ans.get(id) && weight !== 0) {
                    ans.set(id, n_dst);
                    parents.set(id, vertex);
                    queue.push([n_dst, id]);
                    queue.sort(function (a, b) {
                        return b[0] - a[0];
                    });
                }
            });
        }
        const path = [];
        path.push(from);
        while(parents.get(from) !== -1) {
            from = parents.get(from);
            path.push(from);
        }

        return path.map(id => {
            let result = Object.assign({}, this.graphMap.get(id));
            delete result.ways;
            return result;
        });
    }

    static _getWeight(roomId, room) {
        if (roomId === room.roomId || !room.ways) return 0;
        for (let i = 0; i < room.ways.length; i++) {
            if (room.ways[i] === roomId) return room.load;
        }
        return 0;
    }

    _sort(arr: Array<IRoom>) {
        arr.sort((a, b) => {
            let tA = typeof a.roomId;
            let tB = typeof b.roomId;
            if (tA === tB) {
                if (tA === 'number') return a.roomId - b.roomId;
            }
            return typeof tA === 'string' ? 1 : -1;
        });
    }
}