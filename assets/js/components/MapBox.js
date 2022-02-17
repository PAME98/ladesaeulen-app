import React from 'react';
import LoadingStationTableContainer from "../containers/LoadingStationTableContainer";

const MapBox = () => {


    return (
        <div className="loadingStation-result-box">
            <div className="wemag-header">
                <h1>
                    WEMAG Ladestationen
                </h1>
            </div>
            <div className="result-container">
                <LoadingStationTableContainer/>
            </div>
        </div>
    );
}

export default MapBox;