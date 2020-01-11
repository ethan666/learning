import { XYZ, TileImage } from 'ol/source'
import { bd09togcj02 } from "./transform.js"
import TileGrid from "ol/tilegrid/TileGrid"
import { lngLatToMercator, mercatorToLngLat } from "./transformBD09.js"
import { defaults as defaultControls } from 'ol/control'
import OverviewMap from "ol/control/OverviewMap";
import { Projection, addProjection, addCoordinateTransforms } from "ol/proj";
let projBD09 = new Projection({
    code: 'BD:09',
    extent: [-20037726.37, -11708041.66, 20037726.37, 12474104.17],
    units: 'm',
    axisOrientation: 'neu',
    global: false
});

/*
本代码核心部分：
定义从4326经纬度坐标系到百度坐标系的变换
经由这个变换就可以将普通的经纬度坐标转换为百度坐标 
*/
addProjection(projBD09);
addCoordinateTransforms("EPSG:4326", "BD:09",
    function(coordinate) {
        return lngLatToMercator(coordinate);
    },
    function(coordinate) {
        return mercatorToLngLat(coordinate);
    }
);
var resolutions = [];
for (var i = 0; i <= 18; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}

var tilegrid = new TileGrid({
    origin: [0, 0],
    resolutions: resolutions
});
//
//百度矢量图
var baidu_source = new TileImage({
    projection: "BD:09",
    tileGrid: tilegrid,
    tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -1 - tileCoord[2];
        if (x < 0) {
            x = 'M' + (-x);
        }
        if (y < 0) {
            y = "M" + (-y);
        }
        return "http://online3.map.bdimg.com/tile/?qt=tile&x=" + x + "&y=" + y + "&z=" + z +
            "&styles=pl&udt=20141119&scaler=1";
    }
});
//百度影像图
var baidu_source2 = new TileImage({
    projection: "BD:09",
    tileGrid: tilegrid,
    tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -1 - tileCoord[2];

        if (x < 0) {
            x = 'M' + (-x);
        }
        if (y < 0) {
            y = "M" + (-y);
        }
        return 'http://shangetu' + parseInt(Math.random() * 10) + '.map.bdimg.com/it/u=x=' + x +
            ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&udt=20170606';
    }
});
//百度标注
var baidu_source3 = new TileImage({
    projection: "BD:09",
    tileGrid: tilegrid,
    tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -1 - tileCoord[2];

        if (x < 0) {
            x = 'M' + (-x);
        }
        if (y < 0) {
            y = "M" + (-y);
        }
        // https: //maponline2.bdimg.com/tile/?qt=vtile&x=44&y=18&z=8&styles=sl&udt=20191224
        return 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' +
            x + '&y=' + y + '&z=' + z + '&styles=sl&udt=20170620&scaler=1&p=1';
    }
});
const mapconfig = {
    source: [
        new XYZ({
            "url": "https://www.google.cn/maps/vt?lyrs=p&gl=cn&x={x}&y={y}&z={z}",
            projection: "EPSG:3857",
            wrapX: false
        }),

        new XYZ({
            'url': 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
            projection: "EPSG:3857",
            wrapX: false
        }),
        new XYZ({
            'url': 'http://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}',
            projection: "EPSG:3857",
            wrapX: false
        }),
        baidu_source,
        baidu_source2,
        baidu_source3,
        // new XYZ({//高德地图
        //     'url': 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        //     projection: "EPSG:3857",
        //     wrapX: false
        // })
        // new XYZ({ //高德影像图
        //     'url': 'https://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        //     projection: "EPSG:3857",
        //     wrapX: false
        // })
    ],
    controls: new defaultControls().extend([new OverviewMap()])
}
export default mapconfig