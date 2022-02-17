import axios from "axios";

export const LOADING_CSV = 'LOADING_CSV'
export const LOADING_CSV_SUCCESS = 'LOADING_CSV_SUCCESS'
export const LOADING_CSV_FAIL = 'LOADED_CSV'
export const SELECT_LOADINGSTATION = 'SELECT_LOADINGSTATION'
export const SET_FILTERS = 'SET_FILTERS'

export const http = axios.create({
    baseURL: "https://ladesaeulen-app.ddev.site/api"
});

export const loadCsvDataAction = (filters) => {
    let queryString;
    if (filters) {
        queryString = new URLSearchParams(filters);
    } else {
        queryString = ""
    }
    return dispatch => {
        dispatch(loadingCsvStarted());
        http.get("/loading_stations?" + queryString, {
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
    fetching: true
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

export const selectLoadingStation = loadingStation => ({
    type: SELECT_LOADINGSTATION,
    selectedLoadingStation: {...loadingStation}
})

export const setFilters = filters => ({
    type: SET_FILTERS,
    filters: {...filters},
})