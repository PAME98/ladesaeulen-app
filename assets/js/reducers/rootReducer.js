import {SELECT_LOADINGSTATION, LOADING_CSV, LOADING_CSV_SUCCESS, SET_FILTERS} from '../actions/actions'
import OlView from "ol/View";
import {fromLonLat} from "ol/proj";
import OlMap from "ol/Map";
import TileLayer from "ol/layer/Tile"
import {OSM} from "ol/source";

let options = {
    view: new OlView({
        zoom: 8,
        center: fromLonLat([11.5, 53.5])
    }),
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    controls: [],
    overlays: []
}
let mapObject = new OlMap(options);

export const initialState = {
    csvData: [],
    mapData: mapObject,
    fetching: false,
    selectedLoadingStation: {},
    filters: {
        city: "",
        address: "",
        postalCode: "",
        description: ""
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CSV:
            return {
                ...state,
                fetching: action.fetching
            }

        case LOADING_CSV_SUCCESS:
            return {
                ...state,
                csvData: [...action.csvData],
                fetching: action.fetching
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: {...action.filters}
            }
        case SELECT_LOADINGSTATION:
            return {
                ...state,
               selectedLoadingStation: action.selectedLoadingStation
            }
        default:
            return state;
    }
};
export default rootReducer;