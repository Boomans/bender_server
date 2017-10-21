const fs = require('fs');

class GraphData {
    private _graphData: Array<any>;

    constructor() {

    }

    read() {
        let graphDataF1 = fs.readFileSync(__dirname + '/../../../static/info_f1.json', {encoding: 'utf8'});
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
        this._graphData = this._graphData.concat(graphDataSpecialF2);
    }

    getData() {
        return this._graphData;
    }

}
export default new GraphData();