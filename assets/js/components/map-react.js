import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import MapComponentContainer from "../containers/MapComponentContainer";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import SearchFilterContainer from "../containers/SearchFilterContainer";

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <SearchFilterContainer/>
        <MapComponentContainer/>
    </Provider>,
    document.getElementById('map-component')
)