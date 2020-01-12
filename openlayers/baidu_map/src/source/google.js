import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";

const source = new XYZ(
    {
        // url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
        url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
    }
)

export default source