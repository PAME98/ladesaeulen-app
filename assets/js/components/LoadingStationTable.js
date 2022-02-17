import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';

const LoadingStationTable = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData([...props.csvData])
    }, [props.csvData])

    function hoverLoadingStation(loadingStation) {
        props.selectLoadingStation(loadingStation);
    }

    function unHoverLoadingStation() {
        props.selectLoadingStation(null);
    }


    return (
            <ul className="list-group">
                {data.length?
                data.map(loadingStation =>
                    <li className="list-group-item  loadingStation-result-item" onMouseOver={(event) => hoverLoadingStation(loadingStation)}
                        onMouseLeave={() => {
                            unHoverLoadingStation()
                        }}>
                        <div>{loadingStation.description}</div>
                        <div>{loadingStation.city}</div>
                        <div>{loadingStation.address}</div>
                        <div>{loadingStation.postalCode}</div>
                    </li>
                )
                : <li className="list-group-item">Es wurden keine Ladestationen gefunden.</li>}
            </ul>
    );
}

export default LoadingStationTable;