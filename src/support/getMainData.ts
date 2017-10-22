import GraphData from "./GraphData";
import LoadReqRunner from "./LoadReqRunner";

export default function() {
    let loadData = LoadReqRunner.getData();
    if (!loadData) {
        throw 'Load data is not ready';
    }
    let graphData = GraphData.getData();
    if (!graphData) {
        throw 'Graph data is not ready';
    }
    return {
        loadData,
        graphData
    }
}