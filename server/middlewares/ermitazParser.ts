const osmosis = require('osmosis');
const fs = require('fs');

import {sendData, Success} from "../../src/support/http";

module.exports = (req, res) => {
    let i = 0;
    let result = [];
    while (i < 87) {
        osmosis
            .get(`http://www.hermitagemuseum.org/wps/portal/hermitage/explore/highlights?lng=ru&p0=titlasc&p1=all&p2=all&p3=all&p4=${i}`)
            .follow('#layoutContainers .container .component-container .component-control section.ibmPortalControl .wpthemeControlBody .her-element .her-image-grid-list .her-row .her-col-100 .her-list-item-img a[href]')
            .set({
                'room': ['.her-additional-info .her-data-table .her-data-tbl-row .her-data-tbl-val a script'],
                'building': ['.her-additional-info .her-data-table .her-data-tbl-row .her-data-tbl-val a'],
                'name': ['#her-main-content .her-element article.her-col-65-sm-max'],
                'img': ['#her-main-content .her-element section.her-img-viewer-woa .her-img-viewer .her-carousel .her-item .her-carousel-content .her-img-canvas img@src']
            })
            .data(function (q) {
                result.push(analyse(q));
            });
        i++;
    }
    sendData(res, Success({}));
    setTimeout(() => {
        fs.writeFile(__dirname + '/../../../static/info.json', JSON.stringify(result), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }, 20000);
};

function analyse(data) {
    let result: any = {};
    let info = data.name[0];
    info = info.replace(/[\s]{2,}/g, '#');
    info = info.replace(/:#/g, ':');
    let pairs = info.split('#');
    info = pairs.map(pair => {
        return pair.split(':');
    });

    result.about = info.reduce((result, elem) => {
        let key = elem[0].split(' ');
        if (key.length <= 2) {
            result[key.join('_')] = elem[1];
        }
        return result;
    }, {});


    result.room = data.room[0];
    if (result.room) {
        result.room = /'([\w\d]+)'/.exec(result.room);
        if (result.room) {
            result.room = result.room[1];
        }
    }

    result.img = data.img[0];
    if (result.img) {
        result.img = 'http://www.hermitagemuseum.org/' + result.img;
    }
    result.building = data.building[0];
    return result;
}