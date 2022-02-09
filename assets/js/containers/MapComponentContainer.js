import {connect} from "react-redux";
import {editMapDataAction, loadCsvDataAction} from "../actions/actions";
import MapComponent from "../components/MapComponent";

function mapStateToProps(state) {
    return {
        csvData: state.csvData,
        fetching: state.fetching,
        mapData: state.mapData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadCsvData: () => dispatch(loadCsvDataAction()),
        editMapData: (mapData) => dispatch(editMapDataAction(mapData)),
    };
}

const MapComponentContainer = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
export default MapComponentContainer