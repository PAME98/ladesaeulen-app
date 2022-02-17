import {connect} from "react-redux";
import {loadCsvDataAction, selectLoadingStation} from "../actions/actions";
import LoadingStationTable from "../components/LoadingStationTable";

function mapStateToProps(state) {
    return {
        csvData: state.csvData,
        fetching: state.fetching,
        selectedLoadingStation: state.selectedLoadingStation
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadCsvData: () => dispatch(loadCsvDataAction()),
        selectLoadingStation: (loadingStation) => dispatch(selectLoadingStation(loadingStation))
    };
}

const LoadingStationTableContainer = connect(mapStateToProps, mapDispatchToProps)(LoadingStationTable);
export default LoadingStationTableContainer;