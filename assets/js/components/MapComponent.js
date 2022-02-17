import React, {useEffect, useRef, useState} from 'react';
import "../../styles/MapComponent.scss"
import {Feature, Overlay} from "ol";
import Point from "ol/geom/Point"
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";
import {Vector} from "ol/source";
import {Vector as LVector} from "ol/layer";
import MapMarkerPopup from "./MapMarkerPopup";
import * as ReactDOM from "react-dom";
import VectorSource from "ol/source/Vector";
import MapBox from "./MapBox";


const MapComponent = (props) => {
    const [data, setData] = useState([]);
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [popup, setPopup] = useState(new Overlay({}));
    const popupRef = useRef();
    const contentRef = useRef();


    const makeMarker = (loadingStation) => {
        let marker = new Feature({
            geometry: new Point(fromLonLat([loadingStation.longitude, loadingStation.latitude])),
            loadingStation: loadingStation
        });
        marker.setId(loadingStation.id)
        marker.setStyle(new Style({
            image: new Icon({
                scale: 0.02,
                // crossOrigin: 'anonymous',
                src: require("../../Map_pin_icon_green.svg.png")
            })
        }));
        return marker;
    }

    const createMarkerLayer = () => {
        props.mapData.getLayers().forEach(layer => layer.getSource().clear());
        let markers = props.csvData.map(loadingStation => {
            return makeMarker(loadingStation)
        })
        let vectorSource = new Vector({features: [...markers]})
        let markerVectorLayer = new LVector({
            source: vectorSource
        });
        props.mapData.addLayer(markerVectorLayer);
    }

    useEffect(() => {
        props.mapData.addOverlay(popup);
    }, [popup, props.mapData]);

    useEffect(() => {
        props.loadCsvData();
    }, [])

    useEffect(() => {
        setData([...props.csvData]);
    }, [props.csvData])

    useEffect(() => {
        props.mapData.setTarget(mapRef.current)
        setMap(props.mapData)
    }, []);

    useEffect(() => {
        createMarkerLayer();
        console.log("lal")
    }, [props.csvData]);

    useEffect(() => {
        let feature;
        if (props.selectedLoadingStation.id) {
            props.mapData.getLayers().forEach(layer => {
                if (layer.getSource() instanceof VectorSource && layer.getSource().getFeatureById(props.selectedLoadingStation.id)) {
                    feature = layer.getSource().getFeatureById(props.selectedLoadingStation.id);
                    console.log(feature);
                }
            });
            if (feature) {
                props.mapData.getOverlayById('info').setPosition(feature.getProperties().geometry.flatCoordinates);
                if (contentRef.current) {
                    ReactDOM.render(<MapMarkerPopup
                        loadingStation={feature.getProperties().loadingStation}/>, contentRef.current)
                }
            }
        } else {
            ReactDOM.render(<div/>, contentRef.current)
        }
    }, [props.selectedLoadingStation]);

    useEffect(() => {
        props.mapData.setTarget('map');
        props.mapData.on('pointermove', (event) => {
            let feature = props.mapData.forEachFeatureAtPixel(event.pixel, (feature) => {
                return feature;
            });
            if (!props.mapData.hasFeatureAtPixel(event.pixel)) {
                feature = false;
            }
            if (feature) {
                props.mapData.getOverlayById('info').setPosition(event.coordinate);
                console.log(feature);
                if (contentRef.current) {
                    ReactDOM.render(<MapMarkerPopup
                        loadingStation={feature.getProperties().loadingStation}/>, contentRef.current)
                }
            } else {
                ReactDOM.render(<div/>, contentRef.current)
            }
        });
        props.mapData.on('pointermove', (event) => {
            if (!event.dragging) {
                props.mapData.getTargetElement().style.cursor = props.mapData.hasFeatureAtPixel(props.mapData.getEventPixel(event.originalEvent)) ? 'pointer' : '';
            }
        });

        setPopup(new Overlay({
            id: 'info',
            element: popupRef.current,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [9, 9],
        }));
    }, [map]);

    return (
        <div className="mapContainer">
            <MapBox/>
            <div id="map" className="ol-map" ref={mapRef}/>
            <div id="map-popup" className="map-popup" ref={popupRef}>
                <div id="content" ref={contentRef}>

                </div>
            </div>
        </div>

    )
}

export default MapComponent;