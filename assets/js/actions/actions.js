import axios from "axios";

export const LOADING_CSV = 'LOADING_CSV'
export const LOADING_CSV_SUCCESS = 'LOADING_CSV_SUCCESS'
export const LOADING_CSV_FAIL = 'LOADED_CSV'
export const EDIT_MAP_DATA = 'EDIT_MAP_DATA'

export const http =  axios.create({
    baseURL: "https://ladesaeulen-app.ddev.site/api"
});

export const loadCsvDataAction = () => {
    return dispatch => {
        dispatch(loadingCsvStarted());
        http.get("/loading_stations", {
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            }
        )
            .then(res => {
                dispatch(loadingCsvDataSuccess(res.data));
            })
            .catch(err => {
                dispatch(loadingCsvDataFailure(err.message));
            });
    };
}

const loadingCsvStarted = () => ({
    type: LOADING_CSV,
    fetching:true
});

const loadingCsvDataSuccess = csvData => ({
    type: LOADING_CSV_SUCCESS,
    fetching: false,
    csvData: [...csvData]
});


const loadingCsvDataFailure = error => ({
    type: LOADING_CSV_FAIL,
    fetching: false
});

export const editMapDataAction = mapData => ({
    type: EDIT_MAP_DATA,
    mapData: {...mapData}
})