import React, {useEffect, useRef, useState} from 'react';
import "../../styles/MapComponent.scss"
import ol, {Feature} from "ol";
import Point from "ol/geom/Point"
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";
import {Vector} from "ol/source";
import {Vector as LVector} from "ol/layer";


const MapComponent = (props) => {
    const [data, setData] = useState([]);
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    const makeMarker = (lat, lng) => {
        let marker = new Feature({
            geometry: new Point(fromLonLat([lng, lat])),

        });
        marker.setStyle(new Style({
            image: new Icon({
                scale: 0.02,
                // crossOrigin: 'anonymous',
                src: require("../../Map_pin_icon_green.svg.png")
            })
        }));
        let vectorSource = new Vector({features: [marker]})
        let markerVectorLayer = new LVector({
            source: vectorSource
        });
        map.addLayer(markerVectorLayer);
    }

    useEffect(() => {
        props.loadCsvData();
    },[])

    useEffect(() => {
        setData([...props.csvData])
    }, [props.csvData])

    useEffect(() => {
        setMap(props.mapData)
        props.mapData.setTarget(mapRef.current)
    }, []);

    useEffect(() => {
        if (!map) return;
        map.getView().setZoom(props.mapData.options.view.zoom);
    }, [props.mapData.getView().getZoom()]);

    useEffect(() => {
       props.csvData.map(loadingStation => {
            makeMarker(loadingStation.latitude, loadingStation.longitude)
        })
    }, [data]);

    useEffect(() => {
        if (!map) return;
        map.getView().setCenter(map)
    }, [props.mapData.getView().getCenter()]);

    return (
        <div ref={mapRef} className="ol-map"/>

    )
}

export default MapComponent;