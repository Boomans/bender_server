const got = require('got');

class LoadReqRunner{
    _intervalId: NodeJS.Timer;
    _loadData: Map<any, any>;
    private _LOAD_DATA_URL: string;
    constructor() {
        this._LOAD_DATA_URL = '77.244.216.138:3001/data.json';
    }

    start() {
        this._intervalId = setInterval(async () => {
            try {
                const result = await got(this._LOAD_DATA_URL);
                const loadBuff = JSON.parse(result.body);
                this._loadData = new Map();
                loadBuff.data.forEach(elem => {
                    this._loadData.set(elem.num, elem.count);
                });
                //console.log('load data update');
            } catch (e) {
                //TODO логируем
            }
        }, 5000);
    }

    getData() {
        return this._loadData;
    }

    stop() {
        clearInterval(this._intervalId)
    }
}

export default new LoadReqRunner();