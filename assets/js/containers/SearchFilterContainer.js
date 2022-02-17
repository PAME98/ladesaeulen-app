import {connect} from "react-redux";
import {loadCsvDataAction, setFilters} from "../actions/actions";
import SearchFilter from "../components/SearchFilter";

function mapStateToProps(state) {
    return {
        filters: state.filters,
        csvData: state.csvData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setFilters: (filters) => dispatch(setFilters(filters)),
        loadCsvData: (filters) => dispatch(loadCsvDataAction(filters))
    };
}

const SearchFilterContainer = connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
export default SearchFilterContainer;