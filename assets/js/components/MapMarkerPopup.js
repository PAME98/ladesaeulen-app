import React from 'react';

function MapMarkerPopup(props) {

    return (
        <div className="popover loadingstation-popover">
            <p className="popover-header wemag-header">{props.loadingStation.title}</p>
            <div className="popover-body">
                <span>{props.loadingStation.address}, </span>
                <span>{props.loadingStation.city}, </span>
                <span>{props.loadingStation.postalCode}</span>
                <p>{props.loadingStation.description}</p>
            </div>
        </div>
    );
}

export default MapMarkerPopup;