import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import {
    getAPI_KEY,
    UFMG_DEFAULT_CENTER,
} from '../../../api/googleMapsService';

export const GoogleMapsView = ({ zoom = 16, cantinas = [], onMarkerClick }) => {
    const apiKey = getAPI_KEY();

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultZoom={zoom}
                defaultCenter={UFMG_DEFAULT_CENTER}
                disableDefaultUI
                clickableIcons={false}
                style={{ width: '100%', height: '100%' }}
            >
                {cantinas.map((cantina, index) => {
                    const position = {
                        lat: parseFloat(cantina.posX),
                        lng: parseFloat(cantina.posY),
                    };
                    return (
                        <Marker
                            key={index}
                            position={position}
                            onClick={() => onMarkerClick(cantina)}
                        />
                    );
                })}
            </Map>
        </APIProvider>
    );
};
