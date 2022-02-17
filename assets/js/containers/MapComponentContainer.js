import {connect} from "react-redux";
import {featureSelectAction, loadCsvDataAction} from "../actions/actions";
import MapComponent from "../components/MapComponent";

function mapStateToProps(state) {
    return {
        csvData: state.csvData,
        fetching: state.fetching,
        mapData: state.mapData,
        selectedLoadingStation: state.selectedLoadingStation
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadCsvData: () => dispatch(loadCsvDataAction()),
        editMapData: (mapData) => dispatch(featureSelectAction(mapData)),
    };
}

const MapComponentContainer = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
export default MapComponentContainer